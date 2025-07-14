import { useEffect, useState } from "react";
import {
  getOrders,
  createOrder,
  deleteOrder,
} from "../../services/orderService";
import { getClients } from "../../services/clientService";
import { getEnterprises } from "../../services/enterpriseService";

import OrderForm from "../../components/order/OrderForm";
import OrderList from "../../components/order/OrderList";
import { useNavigate } from "react-router-dom";

interface Order {
  _id: string;
  numberOrder: string;
  enterpriseId: string;
  clientId: string;
  createdAt: string;
}

interface Client {
  _id: string;
  clientName: string;
  enterpriseId: string;
}

interface Enterprise {
  _id: string;
  tradeName: string;
}

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const enterprisesRes = await getEnterprises();
        const enterpriseList = enterprisesRes.data;
        setEnterprises(enterpriseList);

        const clientsRes = await Promise.all(
          enterpriseList.map((e: { _id: string; }) => getClients(e._id))
        );
        const allClients = clientsRes.flatMap((res) => res.data);
        setClients(allClients);

        const orderResults = await Promise.allSettled(
          enterpriseList.map((e: { _id: string; }) => getOrders(e._id))
        );

        const allOrders = orderResults
          .filter((res) => res.status === "fulfilled")
          .flatMap((res) => (res as PromiseFulfilledResult<any>).value.data);

        setOrders(allOrders);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchAll();
  }, []);

  const handleAddOrder = async (
    data: Omit<Order, "_id" | "createdAt">
  ) => {
    try {
      await createOrder(data);
      const updatedOrders = await getOrders(data.enterpriseId);
      setOrders((prev) => [
        ...prev.filter((o) => o.enterpriseId !== data.enterpriseId),
        ...updatedOrders.data,
      ]);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleDeleteOrder = async (
    enterpriseId: string,
    clientId: string,
    id: string,
  ) => {
    try {
      await deleteOrder(id, enterpriseId, clientId);
      const updatedOrders = await getOrders(enterpriseId);
      setOrders((prev) => [
        ...prev.filter((o) => o.enterpriseId !== enterpriseId),
        ...updatedOrders.data,
      ]);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleManagerOrder = async (id: string) => {
    await navigate(`/pedidos/${id}`)
  }

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold text-secondary mb-6">
        Gerenciar Pedidos
      </h1>

      <OrderForm
        onSubmit={handleAddOrder}
        clients={clients}
        enterprises={enterprises}
      />

      <OrderList 
        orders={orders}
        onDelete={handleDeleteOrder}
        onManager={handleManagerOrder}
        clients={clients}
        enterprise={enterprises}
        />

    </section>
  );
}
