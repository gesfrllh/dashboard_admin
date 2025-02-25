import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HTTPPOST from "../utils/Api";
import CryptoJS from 'crypto-js';
import { Customers } from "../type";
import { useNotification } from "../context/NotificationContext";

interface User {
    email: string;
    token: string;
    customer?: Customers;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const secretKey = import.meta.env.VITE_SECRET_KEY;

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const encryptToken = (token: string) => {
        return CryptoJS.AES.encrypt(token, secretKey).toString();
    };

    const decryptToken = (encryptedToken: string) => {
        const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(decryptToken(storedUser)) : null;
    });

    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const login = async (email: string, password: string) => {
        try {
            const response = await HTTPPOST.post('api/auth/login', {
                email: email,
                password: password
            });

            if (response.status === 200) {
                const { token } = response.data;

                if (token) {
                    const encryptedUser = encryptToken(JSON.stringify({ email, token }));
                    localStorage.setItem('user', encryptedUser);
                    const stoUser = JSON.parse(decryptToken(encryptedUser));
                    setUser({ ...stoUser, token });
                    localStorage.setItem('token', token);
                    showNotification('Berhasil Masuk', 'success');
                    navigate("/");
                } else {
                    showNotification('Login gagal. Periksa email dan password Anda.', 'error');
                }
            } else {
                showNotification('Login gagal. Status kode: ' + response.status, 'error');
            }
        } catch (err: any) {
            console.error(err);
            if (err.response) {
                // Handle known error responses
                if (err.response.status === 401) {
                    showNotification('Login gagal. Email atau password salah.', 'error');
                } else {
                    showNotification('Login gagal. Kesalahan server: ' + err.response.data.message, 'error');
                }
            } else {
                // Handle unknown errors (e.g., network issues)
                showNotification('Login gagal. Kesalahan jaringan atau server.', 'error');
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // Consider removing the token as well
        setUser(null);
        navigate("/login", { replace: true });
    };

    const value = useMemo(() => ({
        user,
        login,
        logout
    }), [user, navigate]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
