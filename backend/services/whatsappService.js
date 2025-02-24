const axios = require("axios");
require("dotenv").config();

const WABLAS_API_URL = process.env.WABLAS_API_URL;
const WABLAS_API_TOKEN = process.env.WABLAS_API_TOKEN;
const WABLAS_SECRET_KEY = process.env.WABLAS_SECRET_KEY;

const sendWhatsAppMessage = async (phone, message) => {
  try {
    const encodedMessage = encodeURIComponent(message);
    const url = `${WABLAS_API_URL}?token=${WABLAS_API_TOKEN}.${WABLAS_SECRET_KEY}&phone=${phone}&message=${encodedMessage}`;
    const response = await axios.get(url);
    
    if (response.data.status) {
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message || "Gagal mengirim pesan" };
      }
    } catch (error) {
      console.error("❌ Error sending WhatsApp message:", error.response?.data || error.message);
      return { success: false, message: error.response?.data?.message || "Terjadi kesalahan" };
    }
};

module.exports = { sendWhatsAppMessage };
