const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'userName is required'],
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'confirm password is required'],
    validate: {
      validator: function (pass) {
        return this.password === pass;
      },
      message: "password didn't match",
    },
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    required: [true, 'role required'],
  },
});

userSchema.pre('save', async function (next) {
  this.confirmPassword = undefined;
  next();
});

const users = mongoose.model('users', userSchema);

module.exports = users;
