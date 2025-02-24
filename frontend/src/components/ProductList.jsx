import { useState } from "react";
import TransactionForm from "./TransactionForm";

const ProductList = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="min-h-screen flex-col items-center p-2 bg-gray-100">
      {selectedProduct ? (
        <TransactionForm product={selectedProduct} onBack={() => setSelectedProduct(null)} />
      ) : (
        <div className="w-full max-w-8xl">
          <div className="flex flex-col md:flex-row gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex w-full md:w-[350px] flex-row items-center justify-between p-4 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition border-l-8 border-blue-500"
              >
                {/* Bagian Kiri: Nama dan Harga */}
                <div className="pr-6">
                  <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
                  <p className="text-lg text-gray-700 mt-1">
                    Harga: <span className="font-semibold text-gray-900">Rp{product.price.toLocaleString()}</span>
                  </p>
                </div>

                {/* Tombol Beli */}
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="px-4 py-1 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
                >
                  Beli
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
