// CustomerContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CustomerContextType {
  customerData: any[]; 
  updateCustomerData: (newData: any[]) => void; 
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customerData, setCustomerData] = useState<any[]>([]); 

  const updateCustomerData = (newData: any[]) => { 
    setCustomerData(newData);
  };

  return (
    <CustomerContext.Provider value={{ customerData, updateCustomerData }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};
