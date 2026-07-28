import mongoose from "mongoose";

const tripSchema =
  new mongoose.Schema({
    userId: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    budget: {
      type: String,
      required: true,
    },

    travelers: {
      type: String,
      required: true,
    },

    itinerary: {
      type: String,
      required: true,
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

const Trip = mongoose.model(
  "Trip",
  tripSchema
);

export default Trip;