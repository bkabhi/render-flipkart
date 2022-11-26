import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    category_id: {
      type: Number,
      required: true
    },
    category_name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    stars: {
      type: Number,
      required: false
    },
    ratings: {
      type: String,
      required: false
    },
    reviews: {
      type: String,
      required: false
    },
    warranty: {
      type: String,
      required: false
    },
    new_price: {
      type: Number,
      required: true
    },
    old_price: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      required: true
    },
    delivery_type: {
      type: String,
      required: true
    },
    offer: {
      type: String,
      required: false
    },
    offer2: {
      type: String,
      required: false
    },
    hidden_stars: {
      type: Number,
      required: true
    },
    item_id: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: false
    },
    size: {
      type: String,
      required: false
    },
    more_data: {
      type: String,
      required: false
    },
    color: {
      type: String,
      required: false
    },
    brand: {
      type: String,
      required: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);
const cartItemModel = mongoose.model("cartItem", cartItemSchema);

export default cartItemModel;
