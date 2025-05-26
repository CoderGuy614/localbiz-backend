const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const MessageSchema = new Schema({
  from: {
    type: ObjectId,
    ref: "user",
    required: [true, "from user is required"],
  },
  to: {
    type: ObjectId,
    ref: "user",
    required: [true, "to user is required"],
  },
  biz: {
    type: ObjectId,
    ref: "biz",
  },
  item: {
    type: ObjectId,
    ref: "items",
    required: [true, "item is required"],
  },
  text: {
    type: String,
    required: [true, "text is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Biz = mongoose.model("message", MessageSchema);
