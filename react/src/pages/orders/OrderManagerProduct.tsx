import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderById } from "../../services/orderService";
import { getProducts } from "../../services/productService";
import { createOrderProduct, deleteOrderProduct, getOrderProducts } from "../../services/orderProduct";

import OrderProductForm from "../../components/order-product/OrderProductForm";
import type { Product } from "../../types/types";
import OrderProductList from "../../components/order-product/OrderProductList";

interface Order {
    _id: string;
    numberOrder: string;
    enterpriseId: string;
    clientId: string;
    createdAt: string;
}

interface OrderProduct {
    _id: string;
    productId: {
        _id: string;
        productName: string;
        productValue: string;
        productDescription: string;
    };
    quantity: number;
}

export default function OrderManagerPage() {
    const { orderId } = useParams<{ orderId: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);


    const fetchOrderAndProducts = async () => {
        if (!orderId) return;

        try {
            setLoading(true);

            const orderRes = await getOrderById(orderId);
            const orderData: Order = orderRes.data;
            setOrder(orderData);


            const [productRes, orderProdRes] = await Promise.all([
                getProducts(orderData.enterpriseId),
                getOrderProducts(orderData.enterpriseId, orderData.clientId, orderData._id)
            ]);


            setProducts(productRes.data);
            setOrderProducts(orderProdRes.data);

        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchOrderAndProducts();
    }, [orderId]);

    const handleAddProduct = async (productId: string, quantity: number) => {
        if (!order) return;

        try {
            await createOrderProduct(
                { quantity, productId },
                order.enterpriseId,
                order.clientId,
                order._id
            );
            if (order != null) {
                const updatedOrders = await getOrderProducts(order.enterpriseId,
                    order.clientId, order._id);
                setOrderProducts(() => [
                    ...updatedOrders.data,
                ]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDeleteProduct = async (id: string) => {
        try {
            await deleteOrderProduct(id)
            if (order != null) {
                const updatedOrders = await getOrderProducts(order.enterpriseId,
                    order.clientId, order._id);
                setOrderProducts(() => [
                    ...updatedOrders.data,
                ]);
            }

        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    if (loading || !order) return <p className="p-6">Carregando...</p>;

    return (
        <section className="p-6">
            <h1 className="text-2xl font-bold text-secondary mb-4">
                Gerenciar Pedido #{order.numberOrder}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold mb-2 text-primary">Adicionar Produto</h2>
                    <OrderProductForm
                        products={products}
                        onAddProduct={handleAddProduct}
                    />

                    <OrderProductList
                        orderProducts={orderProducts}
                        products={products}
                        onDelete={handleDeleteProduct}
                    />
                </div>
            </div>
        </section>
    );
}
