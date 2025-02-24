const Transaction = require("../models/Transaction");
const { v4: uuidv4 } = require("uuid");
const core = require("../config/midtrans");
const { generateRandomNumberString } = require("../utils/generator");

exports.createTransaction = async (product, whatsapp_number) => {
  const order_id = uuidv4().replace(/-/g, "").slice(0, 32);
  const voucher_code = generateRandomNumberString(8);

  const parameter = {
    payment_type: "qris",
    transaction_details: { order_id, gross_amount: product.price },
    customer_details: { phone: whatsapp_number },
  };

  const midtransResponse = await core.charge(parameter);

  const transaction = new Transaction({
    order_id,
    product_id: product.id,
    product_name: product.name,
    price: product.price,
    whatsapp_number,
    status: midtransResponse.transaction_status,
    qr_url: midtransResponse.actions.find((a) => a.name === "generate-qr-code").url,
    voucher_code,
  });

  await transaction.save();
  return transaction;
};
