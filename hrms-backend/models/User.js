const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  emp_id: { type: String, unique: true }, // Auto-generated Employee ID
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "employee"], required: true },
  phone: { type: String },
  userImage: { type: String },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password") && this.emp_id) return next();

    // Hash password before saving
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }

    // Generate Employee ID (emp_id) only for new users
    if (!this.emp_id) {
      const lastUser = await this.constructor.findOne(
        {},
        {},
        { sort: { _id: -1 } }
      );

      if (lastUser && lastUser.emp_id) {
        let lastNumber = parseInt(lastUser.emp_id.replace("AT", ""), 10);
        this.emp_id = `AT${String(lastNumber + 1).padStart(4, "0")}`;
      } else {
        this.emp_id = "AT0001";
      }
    }

    next();
  } catch (error) {
    console.error("Error in pre-save middleware:", error);
    next(error); // Pass error to the next middleware
  }
});

module.exports = mongoose.model("User", userSchema);
