import apiClient from './client';

export const memberService = {
    findAll: async (params?: any) => {
        return apiClient.get('/member', { params });
    },
    findOne: async (id: string) => {
        return apiClient.get(`/member/${id}`);
    },
    create: async (data: any) => {
        return apiClient.post('/member', data);
    },
    update: async (id: string, data: any) => {
        return apiClient.patch(`/member/${id}`, data);
    },
    delete: async (id: string) => {
        return apiClient.delete(`/member/${id}`);
    },
    active: async (id: string) => {
        return apiClient.patch(`/member/${id}/active`);
    },
};
