const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  batchNo: { type: String, required: true },
  mfgDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  company: { type: String, required: true },
  wholeSalerName: { type: String, required: true },
  debitMemoDate: { type: Date, required: true },
  challenNo: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
