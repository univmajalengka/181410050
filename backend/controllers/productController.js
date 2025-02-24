const products = [
    { id: 1, name: "Paket 1 Hari", price: 3000, profile: "VOUCHER-1-HARI", time_limit: "1d 00:00:00" },
    { id: 2, name: "Paket 1 Minggu", price: 15000, profile: "VOUCHER-7-HARI", time_limit: "7d 00:00:00" },
    { id: 3, name: "Paket 1 Bulan", price: 50000, profile: "VOUCHER-30-HARI", time_limit: "30d 00:00:00" }
  ];


  exports.getProducts = (req, res) => {
    res.json(products);
  }; 

  module.exports.products = products;
  