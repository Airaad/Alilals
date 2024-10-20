"use client";
import React, { createContext, useContext, useState } from "react";

// Create the context
const SuccessDialogContext = createContext();

// Create a provider component
export const SuccessDialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <SuccessDialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>
      {children}
    </SuccessDialogContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useSuccessDialog = () => {
  return useContext(SuccessDialogContext);
};