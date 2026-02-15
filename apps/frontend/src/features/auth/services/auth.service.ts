import api from '@/services/axios';

export const authService = {
  login: async (data: any) => {
    return api.post('/auth/login', data);
  },
  signup: async (data: any) => {
    return api.post('/auth/signup', data);
  },
};
