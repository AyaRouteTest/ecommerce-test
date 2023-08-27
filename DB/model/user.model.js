import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    profileImage: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/doogob7zl/image/upload/v1690798342/ecommerceDefaults/user/profilePic_s6ev2l.jpg",
      },
      id: {
        type: String,
        default: "ecommerceDefaults/user/profilePic_s6ev2l", // from the folder till the end except the extension
      },
    },
    coverImages: [
      {
        url: { type: String, required: true },
        id: { type: String, required: true },
      },
    ],
    userName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      default: "offline",
      enum: ["offline", "online"],
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    activationCode: String,
    forgetCode: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

userSchema.pre("save", function () {
  if (this.isModified("password")) {
    // document
    this.password = bcrypt.hashSync(this.password, 10);
  }
});

// user.save()

userSchema.methods.checkPassword = function (Password) {
  return bcrypt.compareSync(Password, this.password) ? true : false;
};

// user.checkPassword()

export const User = mongoose.models.User || model("User", userSchema);
