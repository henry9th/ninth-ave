let mongoose = require("mongoose");

let Item = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  availability: { type: Map, required: true },
  sellerName: { type: String, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  postDate: { type: Number, required: true },
});

module.exports = mongoose.model("Item", Item);
