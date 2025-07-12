import api from "./api";

export const getClients = (enterpriseId: string) => api.get(`/clients/${enterpriseId}`);
export const getClientById = (enterpriseId: string, id: string) => api.get(`/clients/${enterpriseId}/${id}`);
export const createClient = (enterpriseId: string, data: any) => api.post(`/clients/${enterpriseId}`, data);
export const updateClient = (enterpriseId: string, id: string, data: any) =>
  api.put(`/clients/${enterpriseId}/${id}`, data);
export const deleteClient = (enterpriseId: string, id: string) => api.delete(`/clients/${enterpriseId}/${id}`);