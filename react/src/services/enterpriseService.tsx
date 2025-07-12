import api from "./api";

export const getEnterprises = () => api.get("/enterprises");
export const getEnterpriseById = (id: string) => api.get(`/enterprises/${id}`);
export const createEnterprise = (data: any) => api.post("/enterprises", data);
export const updateEnterprise = (id: string, data: any) =>
  api.put(`/enterprises/${id}`, data);
export const deleteEnterprise = (id: string) =>
  api.delete(`/enterprises/${id}`);
