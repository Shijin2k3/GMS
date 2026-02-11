import apiClient from '@/api/client';

export const authService = {
    login: async (data: any) => {
        return apiClient.post('/auth/login', data);
    },
    signup: async (data: any) => {
        return apiClient.post('/auth/signup', data);
    },
    logout: () => {
        if (typeof window !== 'undefined') {
            document.cookie = 'token=; Max-Age=0; path=/;';
            window.location.href = '/login';
        }
    },
};

