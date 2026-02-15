import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth.service';

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await authService.login(data);
      return response;
    },
    onSuccess: (response: any) => {
      const result = response?.result;
      if (result?.accessToken) {
        // Set the token cookie
        document.cookie = `token=${result.accessToken}; path=/;`;
        // Redirect to dashboard
        router.push('/dashboard');
      }
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: any) => authService.signup(data),
  });
};

export const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    if (typeof window !== 'undefined') {
      document.cookie = 'token=; Max-Age=0; path=/;';
      router.push('/login');
    }
  };

  return { logout };
};
