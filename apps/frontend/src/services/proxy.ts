import api from './axios';

/**
 * Handles the login request via the central api instance and performs redirection upon success.
 * This encapsulates the logic previously found in the Login component while utilizing
 * the existing axios interceptors for consistency.
 */
export const handleLoginProxy = async (data: any, router: any) => {
    try {
        const response: any = await api.post('/auth/login', data);
        // Note: the response interceptor in axios.ts returns response.data directly
        const result = response?.result;

        if (result?.accessToken) {
            // Set the token cookie
            document.cookie = `token=${result.accessToken}; path=/;`;
            // Redirect to dashboard
            router.push('/dashboard');
            return { success: true, data: response };
        }
        return { success: false, message: response?.message || 'Login failed' };
    } catch (error: any) {
        console.error('Proxy Login Error:', error);
        return { success: false, message: error.message || 'Something went wrong' };
    }
};
