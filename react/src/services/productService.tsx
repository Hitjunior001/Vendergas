import api from "./api";

export const getProducts = (enterpriseId: string) => api.get(`/products/${enterpriseId}`);
export const getProductById = (enterpriseId: string, id: string) => api.get(`/products/${enterpriseId}/${id}`);
export const createProduct = (enterpriseId: string, data: any) => api.post(`/products/${enterpriseId}/`, data);
export const updateProduct = (enterpriseId: string, id: string, data: any) =>
  api.put(`/products/${enterpriseId}/${id}`, data);
export const deleteProduct = (enterpriseId: string, id: string) => api.delete(`/products/${enterpriseId}/${id}`);
