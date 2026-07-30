import mongoose from "mongoose";

const userSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },

      password: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        enum: [
          "user",
          "admin",
        ],
        default: "user",
      },

      lastLogin: {
        type: Date,
        default: null,
      },

      loginCount: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "User",
  userSchema
);