const express = require("express");
const transactionController = require("../controllers/transactionController");

const router = express.Router();

router.post("/", transactionController.createTransaction);
router.post("/webhook", transactionController.handleMidtransWebhook);
router.get("/:order_id", transactionController.getTransactionStatus);


module.exports = router;
