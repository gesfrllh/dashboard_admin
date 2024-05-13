import React, { ReactNode } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{children: ReactNode}> = ({children}) => {
    const user = useAuth();
    if(!user){
        return <Navigate to={'/login'} />
    }

  return <>{children}</>;
}

export default ProtectedRoute