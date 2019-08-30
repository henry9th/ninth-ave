let mongoose = require("mongoose");

let Seller = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
  name: { type: String, required: true },
  bio: { type: String, required: true },
  joinDate: { type: Number, required: true },
  brandImage: { type: String, required: true }, // path to image 
  coverImage: { type: String, required: false } // path to image 
});

module.exports = mongoose.model("Seller", Seller);
