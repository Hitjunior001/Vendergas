import api from "./api";

export const getOrders = (enterpriseId: string) => api.get(`/orders/${enterpriseId}`);
export const getOrderById = (id: string) => api.get(`/orders/${id}`);
export const createOrder = (order: {
  enterpriseId: string;
  clientId: string;
  numberOrder: string;
}) => {
  return api.post(`/orders/${order.enterpriseId}/${order.clientId}`, {
    numberOrder: order.numberOrder,
  });
};
export const updateOrder = (id: string, data: any) =>
  api.put(`/orders/${id}`, data);
export const deleteOrder = (id: string) => api.delete(`/orders/${id}`);
