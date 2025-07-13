import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, createProduct, deleteProduct } from "../../services/productService";
import { getClients, createClient, deleteClient } from "../../services/clientService";

import ProductForm from "../../components/products/ProductForm";
import ProductList from "../../components/products/ProductList";
import ClientForm from "../../components/clients/ClientForm";
import ClientList from "../../components/clients/ClientList";
import type { Client, ClientCreate, Product, ProductCreate } from "../../types/types";


export default function EnterpriseManagerPage() {
  const { enterpriseId } = useParams<{ enterpriseId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      if (!enterpriseId) return;
      try {
        const [productsRes, clientsRes] = await Promise.all([
          getProducts(enterpriseId),
          getClients(enterpriseId),
        ]);
        setProducts(productsRes.data);
        setClients(clientsRes.data);
      } catch (error) {
        console.error("Erro ao carregar dados da empresa", error);
      }
    };

    fetchAll();
  }, [enterpriseId]);

  const handleAddProduct = async (product: ProductCreate) => {
    if (!enterpriseId) return;
    try {
      await createProduct(enterpriseId, product);
      const updatedProducts = await getProducts(enterpriseId);
      setProducts(updatedProducts.data);
    } catch (error) {
      console.error("Erro ao adicionar produto", error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!enterpriseId) return;
    try {
      await deleteProduct(enterpriseId, id);
      const updatedProducts = await getProducts(enterpriseId);
      setProducts(updatedProducts.data);
    } catch (error) {
      console.error("Erro ao deletar produto", error);
    }
  };

  const handleAddClient = async (client: ClientCreate) => {
    if (!enterpriseId) return;
    try {
      await createClient(enterpriseId, client);
      const updatedClients = await getClients(enterpriseId);
      setClients(updatedClients.data);
    } catch (error) {
      console.error("Erro ao adicionar cliente", error);
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!enterpriseId) return;
    try {
      await deleteClient(enterpriseId, id);
      const updatedClients = await getClients(enterpriseId);
      setClients(updatedClients.data);
    } catch (error) {
      console.error("Erro ao deletar cliente", error);
    }
  };

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold text-secondary mb-4">
        Gerenciar Empresa #{enterpriseId}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-primary">Produtos</h2>
          <ProductForm onSubmit={handleAddProduct} />
          <div className="mt-10"/>
          <ProductList products={products} onDelete={handleDeleteProduct} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-primary">Clientes</h2>
          <ClientForm onSubmit={handleAddClient} />
          <div className="mt-10"/>
          <ClientList clients={clients} onDelete={handleDeleteClient} />
        </div>
      </div>
    </section>
  );
}
