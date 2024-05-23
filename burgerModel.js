const mongoose = require('mongoose');
const burgerSchema = mongoose.Schema({
  imageurl: {
    type: String,
    required: false,
  },
  name: String,
  price: Number,
});
const burgers = mongoose.model('burgers', burgerSchema);
module.exports = burgers;
