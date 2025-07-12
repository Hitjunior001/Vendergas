import { useState, type FormEvent } from "react";

interface Product {
  productName: string;
  productValue: string;
  productDescription: string;
}

interface Props {
  onSubmit: (data: Product) => Promise<void>;
  initialData?: Product;
}

export default function ProductForm({ onSubmit, initialData }: Props) {
  const [productName, setProductName] = useState(initialData?.productName || "");
  const [productValue, setProductValue] = useState(initialData?.productValue || "");
  const [productDescription, setProductDescription] = useState(initialData?.productDescription || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({ productName, productValue, productDescription });
    setLoading(false);
    setProductName("");
    setProductValue("");
    setProductDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md border-l-4 border-primary max-w-md"
    >
      <h2 className="text-xl font-semibold text-secondary mb-4">Novo Produto</h2>
      
      <label className="block mb-2 font-medium text-gray-700">Nome</label>
      <input
        type="text"
        value={productName}
        onChange={e => setProductName(e.target.value)}
        required
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <label className="block mb-2 font-medium text-gray-700">Valor</label>
      <input
        type="text"
        value={productValue}
        onChange={e => setProductValue(e.target.value)}
        required
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <label className="block mb-2 font-medium text-gray-700">Descrição</label>
      <textarea
        value={productDescription}
        onChange={e => setProductDescription(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white font-bold py-2 rounded hover:bg-primary-dark disabled:opacity-50"
      >
        {loading ? "Salvando..." : "Salvar Produto"}
      </button>
    </form>
  );
}
