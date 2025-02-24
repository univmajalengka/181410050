const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    order_id: { type: String, required: true, unique: true },
    product_id: { type: Number, required: true },
    product_name: { type: String, required: true },
    price: { type: Number, required: true },
    whatsapp_number: { type: String, required: true },
    status: { type: String, default: "pending" },
    qr_url: { type: String, required: true },
    voucher_code: { type: String, required: true },
    whatsapp_status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
