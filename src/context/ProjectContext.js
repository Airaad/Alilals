"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { app } from "../../firebase/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

// Create context
const ProjectContext = createContext();

// Custom hook for accessing project data
export const useProjects = () => {
  return useContext(ProjectContext);
};

// Provider component
export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const projectsRef = collection(db, "projects");
        const snap = await getDocs(projectsRef);
        const projectsData = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);
      } catch (err) {
        setError("Failed to fetch projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Provide projects data to child components
  return (
    <ProjectContext.Provider value={{ projects, loading, error }}>
      {children}
    </ProjectContext.Provider>
  );
};
