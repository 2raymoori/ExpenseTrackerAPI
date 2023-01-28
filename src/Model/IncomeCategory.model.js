const mongoose = require("mongoose");

const incomeCategorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = IncomeCategorySchema = mongoose.model(
  "incomeCategory",
  incomeCategorySchema
);
