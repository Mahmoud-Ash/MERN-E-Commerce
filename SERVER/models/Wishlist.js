const mongoose = require("mongoose");

const WhishlistSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    productsId: { type: Array, required: true, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Whishlist", WhishlistSchema);
