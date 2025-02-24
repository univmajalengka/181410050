import { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4444/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Gagal mengambil produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Pilih Paket Voucher</h1>
      
      {loading ? (
        <p className="text-lg text-gray-700">⏳ Memuat produk...</p>
      ) : products.length === 0 ? (
        <p className="text-lg text-red-500">⚠️ Produk tidak tersedia.</p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default Home;
