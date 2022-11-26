import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    Name: {
      type: String,
      required: true,
    },
    Number: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Pincode: {
      type: Number,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    State: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const addressModel = mongoose.model("address", addressSchema, "addresses");

export default addressModel;
