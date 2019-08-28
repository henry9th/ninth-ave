let mongoose = require("mongoose");

let Item = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  name: { type: String, required: true },
  bio: { type: String, required: true },
  date: { type: Number, required: true }
});

module.exports = mongoose.model("Item", Item);
