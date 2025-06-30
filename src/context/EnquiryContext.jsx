// src/context/EnquiryContext.jsx
import React, { createContext, useState } from "react";

export const EnquiryContext = createContext();

export const EnquiryProvider = ({ children }) => {
  const [enquiries, setEnquiries] = useState([]);

  const addEnquiry = (newEnquiry) => {
    setEnquiries((prev) => [...prev, newEnquiry]);
  };

  return (
    <EnquiryContext.Provider value={{ enquiries, addEnquiry }}>
      {children}
    </EnquiryContext.Provider>
  );
};
