const Transaction = require("../models/Transaction");
const { products } = require("./productController");
const mikrotikService = require("../services/mikrotikService");
const { sendWhatsAppMessage } = require("../services/whatsappService");
const { isValidWhatsAppNumber } = require("../utils/validator");
const transactionService = require("../services/transactionService");
const { TransactionStatus } = require("../utils/transactionStatus");

exports.createTransaction = async (req, res) => {
  try {
    const { product_id, whatsapp_number } = req.body;

    if (!whatsapp_number || !isValidWhatsAppNumber(whatsapp_number)) {
      return res.status(400).json({ error: "Nomor WhatsApp tidak valid" });
    }

    const product = products.find((p) => p.id === product_id);
    if (!product) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    const transaction = await transactionService.createTransaction(product, whatsapp_number);
    res.status(201).json({ transaction });
  } catch (error) {
    console.error("Create Transaction Error:", error);
    res.status(500).json({ error: "Gagal membuat transaksi" });
  }
};

exports.handleMidtransWebhook = async (req, res) => {
  try {
    const { order_id, transaction_status } = req.body;
    const transaction = await Transaction.findOne({ order_id });

    if (!transaction) {
      return res.status(404).json({ error: "Transaksi tidak ditemukan" });
    }

    if (transaction_status === "settlement") {
      const product = products.find((p) => p.id === transaction.product_id);
      if (!product) {
        return res.status(404).json({ error: "Produk tidak ditemukan" });
      }

      await mikrotikService.createUserHotspot(
        transaction.voucher_code,
        transaction.voucher_code,
        product.profile,
        product.time_limit
      );

      const message = `🎉 Selamat! Pembayaran berhasil.\nVoucher Anda: *${transaction.voucher_code}*\nGunakan segera dan nikmati layanan kami! 😊`;
      const sendResult = await sendWhatsAppMessage(transaction.whatsapp_number, message);

      if (!sendResult.success) {
        console.error("Gagal mengirim voucher via WhatsApp:", sendResult.message);
        transaction.whatsapp_status = "failed";
      } else {
        console.log("✅ Pesan berhasil dikirim:", sendResult.message);
        transaction.whatsapp_status = "sent";
      }

      transaction.status = TransactionStatus.PAID;
    } else if (transaction_status === "expire") {
      transaction.status = TransactionStatus.EXPIRED;
    } else {
      transaction.status = TransactionStatus.FAILED;
    }

    await transaction.save();
    res.status(200).json({ message: "Status transaksi diperbarui" });
  } catch (error) {
    console.error("Webhook Error:", error);
    res.status(500).json({ error: "Gagal memperbarui transaksi" });
  }
};

exports.getTransactionStatus = async (req, res) => {
  try {
    const { order_id } = req.params;
    const transaction = await Transaction.findOne({ order_id });

    if (!transaction) {
      return res.status(404).json({ error: "Transaksi tidak ditemukan" });
    }

    res.status(200).json({ transaction });
  } catch (error) {
    console.error("Error getting transaction status:", error);
    res.status(500).json({ error: "Gagal mendapatkan status transaksi" });
  }
};
