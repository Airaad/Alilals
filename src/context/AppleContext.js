"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { app } from "../../firebase/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

// Create context
const AppleContext = createContext();

// Custom hook for accessing apple data
export const useApples = () => {
  return useContext(AppleContext);
};

// Provider component
export const AppleProvider = ({ children }) => {
  const [apples, setApples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all apples on component mount
  useEffect(() => {
    const fetchApples = async () => {
      setLoading(true);
      try {
        const applesRef = collection(db, "apples");
        const snap = await getDocs(applesRef);
        const applesData = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApples(applesData);
      } catch (err) {
        setError("Failed to fetch apples.");
      } finally {
        setLoading(false);
      }
    };

    fetchApples();
  }, []);

  // Provide apples data to child components
  return (
    <AppleContext.Provider value={{ apples, loading, error }}>
      {children}
    </AppleContext.Provider>
  );
};
