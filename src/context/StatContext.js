"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { app } from "../../firebase/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

// Create context
const StatsContext = createContext();

// Custom hook for accessing stats data
export const useStats = () => {
  return useContext(StatsContext);
};

// Provider component
export const StatsProvider = ({ children }) => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all stats on component mount
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const statsRef = collection(db, "stats");
        const snap = await getDocs(statsRef);
        const statsData = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStats(statsData);
      } catch (err) {
        setError("Failed to fetch stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Provide stats data to child components
  return (
    <StatsContext.Provider value={{ stats, loading, error }}>
      {children}
    </StatsContext.Provider>
  );
};
