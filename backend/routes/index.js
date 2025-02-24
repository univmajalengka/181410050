const express = require('express');
const router = express.Router();
const productRoutes = require('./productRoutes');
const transactionRoutes = require('./transactionRoutes');

router.use('/transactions', transactionRoutes);
router.use('/products', productRoutes);

module.exports = router;