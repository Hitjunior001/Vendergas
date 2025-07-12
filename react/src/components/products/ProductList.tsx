interface Product {
  _id: string;
  productName: string;
  productValue: string;
  productDescription: string;
}

interface Props {
  products: Product[];
  onDelete: (index: string) => Promise<void>;
}

export default function ProductList({ products, onDelete }: Props) {
  return (
    <div className="space-y-4">
      {products.length === 0 && <p className="text-gray-500">Nenhum produto cadastrado.</p>}

      {products.map((product, i) => (
        <div
          key={i}
          className="bg-white p-4 rounded shadow-md border-l-4 border-primary flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold text-secondary text-lg">{product.productName}</h3>
            <p className="text-gray-600">Valor: {product.productValue}</p>
            <p className="text-gray-600">{product.productDescription}</p>
          </div>
          <button
            onClick={() => onDelete(product._id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Deletar
          </button>
        </div>
      ))}
    </div>
  );
}
