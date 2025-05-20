const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  name: String,
  qty: Number,
  price: Number,
  action: String, 
  date: { type: Date, default: Date.now }, 
});

module.exports = { OrdersSchema };