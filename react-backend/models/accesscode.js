let mongoose = require("mongoose");

let AccessCode = new mongoose.Schema({
  code: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  available: { type: Boolean, required: true },
  claimedBy: { type: String, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model("AccessCodes", AccessCode);
