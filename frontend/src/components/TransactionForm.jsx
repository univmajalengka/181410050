import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TransactionForm = ({ product, onBack }) => {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [error, setError] = useState(""); // State untuk pesan error
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error sebelum request baru

    try {
      const res = await axios.post("http://localhost:4444/api/transactions", {
        product_id: product.id,
        whatsapp_number: whatsappNumber,
      });

      navigate(`/transaction/${res.data.transaction.order_id}`);
    } catch (error) {
      console.error("Gagal membuat transaksi:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error); // Ambil pesan error dari backend
      } else {
        setError("Terjadi kesalahan, coba lagi.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <button onClick={onBack} className="text-blue-500 flex items-center mb-4 hover:underline">
          &larr; Kembali
        </button>

        <h1 className="text-2xl font-bold text-gray-800 text-center">{product.name}</h1>
        <p className="text-gray-600 text-center text-lg mt-1">
          Harga: <span className="font-semibold text-gray-900">Rp{product.price.toLocaleString()}</span>
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <label className="block text-gray-700 font-medium mb-2">
            Masukkan Nomor WhatsApp:
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full p-3 border rounded-lg mt-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="08123xxxxxxx"
              required
            />
          </label>

          {/* Menampilkan pesan error jika ada */}
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className={`mt-4 p-3 w-full text-white rounded-lg transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Memproses..." : "Beli Sekarang"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
