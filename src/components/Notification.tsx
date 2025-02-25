// src/components/Notification.tsx
import React, { useEffect, useState } from 'react';
import { useNotification } from '../context/NotificationContext';

const Notification: React.FC = () => {
  const { message, type } = useNotification();
  const [isVisible, setIsVisible] = useState(!!message);
  const [shouldAnimateOut, setShouldAnimateOut] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setShouldAnimateOut(false);
      const timer = setTimeout(() => {
        setShouldAnimateOut(true);
      }, 3000); // Show notification for 3 seconds
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [message]);

  const getNotificationStyle = () => {
    switch (type) {
      case 'success':
        return 'bg-white text-green-500 border-b-2 border-green-500 text-sm';
      case 'error':
        return 'bg-white text-red-500 border-b-2 border-red-500 text-sm';
      case 'info':
        return 'bg-white text-yellow-500 border-b-2 border-yellow-500 text-sm';
      default:
        return '';
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 right-4 py-4 px-8 shadow-lg ${getNotificationStyle()} ${
        shouldAnimateOut ? 'animate-slide-out' : 'animate-slide-in'
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
