import api from "@/services/axios";

export const memberService = {
    findAll: async (params?: any) => {
        return api.get('/member', { params });
    },
    findOne: async (id: string) => {
        return api.get(`/member/${id}`);
    },
    create: async (data: any) => {
        return api.post('/member', data);
    },
    update: async (id: string, data: any) => {
        return api.patch(`/member/${id}`, data);
    },
    delete: async (id: string) => {
        return api.delete(`/member/${id}`);
    },
    active: async (id: string) => {
        return api.patch(`/member/${id}/active`);
    },
};

