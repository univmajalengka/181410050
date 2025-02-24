import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Copy, Check } from "lucide-react"; // Import ikon dari Lucide

const TransactionStatus = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axios.get(`http://localhost:4444/api/transactions/${orderId}`);
        setTransaction(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Gagal mendapatkan status transaksi:", error);
        setLoading(false);
      }
    };

    fetchTransaction();
    const interval = setInterval(fetchTransaction, 2000);
    return () => clearInterval(interval);
  }, [orderId]);

  const handleCopy = () => {
    if (transaction && transaction.transaction.voucher_code.username) {
      navigator.clipboard.writeText(transaction.transaction.voucher_code.username)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => console.error("Gagal menyalin teks:", err));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">⏳ Memuat status transaksi...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Status Transaksi</h1>
        <p className="text-gray-600 text-center">
          Order ID: <span className="font-medium text-gray-900">{transaction.transaction.order_id}</span>
        </p>

        {transaction.transaction.status === "paid" ? (
          <div className="mt-4 p-4 border rounded-lg bg-green-100 text-center">
            <p className="text-green-700 font-bold text-lg">✅ Pembayaran Berhasil!</p>
            <div className="flex justify-center items-center gap-2 mt-2 bg-white p-2 rounded-md shadow">
              <p className="text-gray-800 text-lg">
                <strong className="text-blue-600">{transaction.transaction.voucher_code}</strong>
              </p>
              <button
                onClick={handleCopy}
                className={`p-2 rounded-lg transition flex items-center ${
                  copied ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
            </div>
          </div>
        ) : transaction.transaction.status === "expired" ? (
          <div className="mt-4 p-4 border rounded-lg bg-red-100 text-center">
            <p className="text-red-600 font-bold text-lg">❌ Pembayaran Kadaluarsa</p>
          </div>
        ) : (
          <div className="mt-4 p-4 border rounded-lg bg-yellow-100 text-center">
            <p className="text-yellow-600 font-bold text-lg">⏳ Menunggu Pembayaran...</p>
            <img src={transaction.transaction.qr_url} alt="QRIS Code" className="mt-4 w-48 h-48 mx-auto border" />
            <a href={transaction.transaction.qr_url} target="_blank" rel="noopener noreferrer" className="mt-2 block text-blue-500 underline">
              Klik di sini jika QR tidak tampil
            </a>
          </div>
        )}

        <button onClick={() => navigate("/")} className="mt-6 p-3 bg-blue-500 text-white rounded-lg w-full hover:bg-blue-600 transition">
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default TransactionStatus;
