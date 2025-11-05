const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the schema for a User
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true,    // Email is mandatory
    unique: true       // Email must be unique across users
  },
  password: { 
    type: String, 
    required: true     // Password is mandatory
  },
});

// Middleware to hash the password before saving the user to the database
userSchema.pre("save", async function (next) {
  // If the password field has not been modified, move to the next middleware
  if (!this.isModified("password")) return next();
  try {
    // Generate a salt with 10 rounds
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the salt
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Proceed to save
  } catch (err) {
    // If there’s an error during hashing, pass it to the next middleware
    next(err);
  }
});

// Instance method to compare entered password with hashed password stored in database
userSchema.methods.comparePassword = function (candidatePassword) {
  // Compare the plain password with the hashed password
  return bcrypt.compare(candidatePassword, this.password);
};

// Export the User model based on the userSchema
module.exports = mongoose.model("User", userSchema);
