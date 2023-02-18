const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: [true, "Please provide username"],
      unique: true,
    },
    last_name: {
      type: String,
      required: [true, "Please provide last name"],
    },
    first_name: {
      type: String,
      required: [true, "Please provide first name"],
    },
    middle_name: {
      type: String,
    },
    full_name: {
      type: String,
    },
    birthdate: {
      type: Date,
      required: [true, "Please provide birthdate"],
    },
    gender: {
      type: String,
      enums: ["Male", "Female"],
      required: [true, "Please select Gender"],
    },
    contact_number: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    status: {
      type: String,
      enums: ["Registered", "Verified"],
      default: "Registered",
    },
    user_type: {
      type: String,
      enums: ["user", "admin", "super-admin"],
      default: "super-admin",
    },
    password: {
      type: String,
      select: false,
      minlength: [
        8,
        "Password length must be greater or equal to 8 characters",
      ],
      required: [true, "Please provide password"],
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
    },
    faceId: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", () => {
  this.fullname = `${this.first_name} ${this.last_name}`;
});
userSchema.path("passwordConfirm").validate(function (inputValue) {
  return this.password === inputValue;
}, "Password don't match");

userSchema.pre("save", async function (next) {
  // Run only if the password is modified
  if (!this.isModified("password")) return next;

  //hash the password
  this.password = await bcrypt.hash(this.password, 12);

  //delete the password confirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.comparePassword = async function (inputPass, userPass) {
  return await bcrypt.compare(inputPass, userPass);
};

userSchema.methods.changePasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimestamp;
  }
};

const User = mongoose.model("Users", userSchema);
module.exports = User;
