const Item = require("../models/Item");
const formidable = require("formidable");
const config = require("config");
const _ = require("lodash");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage });

//Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.itemById = (req, res, next, id) => {
  Item.findById(id)
    // .populate("Category")
    .exec((err, item) => {
      if (err || !item) {
        return res.status(400).json({
          error: "Item not found",
        });
      }
      req.item = item;
      next();
    });
};

exports.read = (req, res) => {
  return res.json(req.item);
};

exports.listItems = (req, res) => {
  Item.find({ business: req.biz._id }).exec((err, items) => {
    if (err || !items) {
      return res
        .status(400)
        .json({ error: "No Items Found for This Business" });
    }
    return res.json(items);
  });
};

exports.create = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (files.photo) {
      upload.single("file");
      const cloudinaryFile = await cloudinary.uploader.upload(files.photo.path);
      fields.photo = cloudinaryFile.url;
    }
    let item = new Item(fields);
    item.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
  });
};

exports.update = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Oops, something went wrong, please try again.",
      });
    }
    if (files.photo) {
      upload.single("file");
      const cloudinaryFile = await cloudinary.uploader.upload(files.photo.path);
      fields.photo = cloudinaryFile.url;
    }
    let item = req.item;
    item = _.extend(item, fields);
    item.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
  });
};

exports.deleteItem = (req, res) => {
  let item = req.item;
  item.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "Item deleted successfully",
    });
  });
};
