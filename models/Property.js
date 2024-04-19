const mongoose = require("mongoose");

const propertySchema = mongoose.Schema(
  {
    propertyName: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
    },
    description: {
      type: String,
    },
    ownerID: {
      type: String,
    },
    image: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
