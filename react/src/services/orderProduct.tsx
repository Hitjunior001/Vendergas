import api from "./api";

export const getOrderProducts = (
    enterpriseId: string,
    clientId: string,
    orderId: string) => api.get(`/orders/${enterpriseId}/${clientId}/${orderId}/products`);
export const createOrderProduct = (data: any,
    enterpriseId: string,
    clientId: string,
    orderId: string) =>
         api.post(`/orders/${enterpriseId}/${clientId}/${orderId}/products`, data);
export const deleteOrderProduct = (id: string) =>
  api.delete(`/orders/products/${id}`);

