const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

module.exports = mongoose.model("items", {
  name: {
    type: String,
    trim: true,
    maxlength: 200,
    required: [true, "name is required"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000,
    required: [true, "description is required"],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    trim: true,
    maxlength: 32,
    required: [true, "price is required"],
  },
  canDeliver: {
    type: Boolean,
    default: true,
  },
  business: {
    type: ObjectId,
    ref: "biz",
    required: true,
  },
  photo: {
    type: String,
    default: "https://via.placeholder.com/300",
  },
});
