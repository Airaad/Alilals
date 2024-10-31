"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { app } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  limit,
} from "firebase/firestore";

const db = getFirestore(app);

// Create context
const AlertContext = createContext();

// Custom hook for accessing alert data
export const useAlert = () => {
  return useContext(AlertContext);
};

// Provider component
export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch alert data on component mount
  useEffect(() => {
    const fetchAlert = async () => {
      setLoading(true);
      try {
        const alertsRef = collection(db, "alert");
        const firstAlertQuery = query(alertsRef, limit(1));
        const snap = await getDocs(firstAlertQuery);
        const alertData = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))[0];
        setAlert(alertData || null);
      } catch (err) {
        setError("Failed to fetch alert.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlert();
  }, []);

  // Provide alert data to child components
  return (
    <AlertContext.Provider value={{ alert, loading, error }}>
      {children}
    </AlertContext.Provider>
  );
};
