const mongoose = require("mongoose");

const venderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
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

module.exports = mongoose.model("Vender", venderSchema);
