import { toast } from '@/hooks/use-toast';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.43.188:4200/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = document.cookie
                .split('; ')
                .find((row) => row.startsWith('token='))
                ?.split('=')[1];

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';

        // Centralized error notification using Shadcn Toast
        if (typeof window !== 'undefined') {
            console.log('API Error:', errorMessage);
            toast({
                variant: "destructive",
                title: "Error",
                description: errorMessage,
            });
        }

        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                document.cookie = 'token=; Max-Age=0; path=/;';
                window.location.href = '/login';
            }
        }
        return Promise.reject(error.response?.data || error.message);
    }
);

export default apiClient;
