"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { app } from "../../firebase/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

// Create context
const BlogsContext = createContext();

// Custom hook for accessing blogs data
export const useBlogs = () => {
  return useContext(BlogsContext);
};

// Provider component
export const BlogsProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all blogs on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const blogsRef = collection(db, "blogs");
        const snap = await getDocs(blogsRef);
        const blogsData = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsData);
      } catch (err) {
        setError("Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Provide blogs data to child components
  return (
    <BlogsContext.Provider value={{ blogs, loading, error }}>
      {children}
    </BlogsContext.Provider>
  );
};
