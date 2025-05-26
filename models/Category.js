const mongoose = require("mongoose");

module.exports = mongoose.model("category", {
  name: {
    type: String,
    required: [true, "name is required"],
  },
  color: {
    type: String,
    default: "lightgreen",
  },
});
