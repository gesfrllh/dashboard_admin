import { useState, useEffect } from "react";
import HTTPOFFICE from "../utils/Api";
import { Customers } from "../type";
import { useAuth } from "./useAuth";

// Custom hook for fetching customer data
export const useCustomers = () => {
    const { user } = useAuth();
    const [data, setData] = useState<Customers[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user?.token) {
            const fetchCustomers = async () => {
                setLoading(true);
                try {
                    const response = await HTTPOFFICE.get("api/customers/", {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    });
                    setData(response.data);
                    localStorage.setItem('customer', JSON.stringify(response.data));
                } catch (err) {
                    setError('Failed to fetch customers');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchCustomers();
        }
    }, [user?.token]);

    return { data, loading, error };
};

