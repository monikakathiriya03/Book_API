const mongoose = require("mongoose");

const bookVenderSchema = mongoose.Schema(
  {
    vender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vender",
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionkey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("BookVender", bookVenderSchema);
