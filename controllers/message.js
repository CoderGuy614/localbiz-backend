const Message = require("../models/Message");

exports.create = (req, res) => {
  const fromUserId = req.params.fromUserId;
  const toUserId = req.params.toUserId;
  const itemId = req.item._id;
  const { text } = req.body;
  if (!itemId || !fromUserId || !toUserId || !text) {
    return res
      .status(400)
      .json({ error: "Couldn't send your message. Please try again." });
  }
  let message = new Message({
    from: fromUserId,
    to: toUserId,
    item: itemId,
    text,
  });
  message.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(result);
  });
};

exports.readByUser = (req, res) => {
  Message.find({
    $or: [{ from: req.profile._id }, { to: req.profile._id }],
  })
    .populate({
      path: "from",
      select: "name email avatar",
    })
    .populate({
      path: "to",
      select: "name email avatar",
    })
    .populate({
      path: "biz",
      select: "name photo",
    })
    .populate({
      path: "item",
      select: "name photo description price",
    })
    .exec((err, messages) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.json(messages);
    });
};
