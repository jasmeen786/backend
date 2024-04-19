const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    userType: {
      type: String,
      default: "coworker",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    emailAddress: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "Email already exists"],
      trim: true,
    },
    userName: {
      type: String,
      required: [true, "User name is required"],
      unique: [true, "User name exists"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "phone number is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    userImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Hash and salt the password before saving
// userSchema.pre("save", async function (next) {
//   try {
//     if (!this.isModified("password")) return next();

//     const hashedPassword = bcrypt.hash(this.password, 10);
//     this.password = hashedPassword;
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
