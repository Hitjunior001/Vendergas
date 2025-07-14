import { useState, type FormEvent } from "react";
import type { Product } from "../../types/types";

interface OrderProductFormProps {
  products: Product[];
  onAddProduct: (
    productId: string,
    quantity: number,
  ) => Promise<void>;
}

export default function OrderProductForm({
  products,
  onAddProduct,
}: OrderProductFormProps) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onAddProduct(productId, quantity );
      setQuantity(1);
      setProductId("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md border-l-4 border-primary max-w-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-secondary mb-2">Adicionar Produto ao Pedido</h2>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Produto</label>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Selecione um produto</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.productName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">Quantidade</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white font-bold py-2 rounded hover:bg-primary-dark disabled:opacity-50"
      >
        {loading ? "Adicionando..." : "Adicionar Produto"}
      </button>
    </form>
  );
}
