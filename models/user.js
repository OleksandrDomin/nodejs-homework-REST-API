// const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
      password: {
        type: String,
        required: [true, "Password is required"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
      },
      token: {
        type: String,
        default: null,
    },
      
    avatarURL: {
      type: String,
      required: [true, "Avatar is required"],
    },
        verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
      default: "",
    },
    },
  { versionKey: false, timestamps: true }
);

// userSchema.post("save", handleMongooseError);

const User = model('User', userSchema);
module.exports = User;