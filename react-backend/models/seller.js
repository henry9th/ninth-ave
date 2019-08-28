let mongoose = require("mongoose");

let Seller = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
  name: { type: String, required: true },
  bio: { type: String, required: true },
  joinDate: { type: Number, required: true }
});

module.exports = mongoose.model("Seller", Seller);
