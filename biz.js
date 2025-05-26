const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const defaultHours = {
  Monday: {
    open: "12:00 AM",
    close: "12:00 AM",
    isClosed: false,
  },
  Tuesday: {
    open: "12:00 AM",
    close: "12:00 AM",
    isClosed: false,
  },
  Wednesday: {
    open: "12:00 AM",
    close: "12:00 AM",
    isClosed: false,
  },
  Thursday: {
    open: "12:00 AM",
    close: "12:00 AM",
    isClosed: false,
  },
  Friday: {
    open: "12:00 AM",
    close: "12:00 AM",
    isClosed: false,
  },
  Saturday: {
    open: "12:00 AM",
    close: "12:00 AM",
    isClosed: false,
  },
  Sunday: {
    open: "12:00 AM",
    close: "12:00 AM",
    isClosed: false,
  },
};

const BizSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "user",
    required: [true, "user is required"],
  },
  category: {
    type: ObjectId,
    ref: "category",
    required: [true, "category is required"],
  },
  name: {
    type: String,
    required: [true, "name is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  city: {
    type: String,
    default: "Siem Reap",
  },
  bizEmail: {
    type: String,
    default: "myBusiness@localBiz.com",
  },
  bizPhone: {
    type: String,
    default: "000-000-0000",
  },
  bizAddress: {
    type: String,
    default: "Address Not Listed",
  },
  lat: {
    type: Number,
    default: 13.3633,
  },
  lng: {
    type: Number,
    default: 103.8564,
  },
  rating: {
    type: Number,
    default: 0,
  },
  hours: {
    type: Object,
    default: defaultHours,
  },
  photo: {
    type: String,
    default: "https://via.placeholder.com/300",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Biz = mongoose.model("biz", BizSchema);
