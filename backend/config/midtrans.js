const midtransClient = require("midtrans-client");

const core = new midtransClient.CoreApi({
  isProduction: false, // Ubah ke true jika sudah live
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

module.exports = core;
