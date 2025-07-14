import type { Product } from "../../types/types";

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

interface Props {
  orderProducts: OrderProduct[];
  products: Product[];
  onDelete: (id: string) => void;
}

export default function OrderProductList({ orderProducts, onDelete }: Props) {
  return (
    <div className="mt-10 space-y-4">
      {orderProducts.length === 0 && (
        <p className="text-gray-500">Nenhum produto adicionado ao pedido.</p>
      )}

      {orderProducts.map((op) => {

        return (
          <div
            key={op._id}
            className="bg-white p-4 rounded shadow-md border-l-4 border-primary flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-secondary text-lg">
                {op.productId.productName}
              </h3>
              <p className="text-gray-600">
                Quantidade: <span className="font-medium">{op.quantity}</span>
              </p>
            </div>
            <button
              onClick={() =>
                onDelete(op._id)
              }
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Deletar
            </button>
          </div>
        );
      })}
    </div>
  );
}
