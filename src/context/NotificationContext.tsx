import React, { createContext, useState, useContext, ReactNode } from 'react';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationContextType {
  message: string;
  type: NotificationType;
  showNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<NotificationType>('info');

  const showNotification = (message: string, type: NotificationType) => {
    setMessage(message);
    setType(type);
    setTimeout(() => {
      setMessage('');
      setType('info');
    }, 3000); // Hide notification after 3 seconds
  };

  return (
    <NotificationContext.Provider value={{ message, type, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
