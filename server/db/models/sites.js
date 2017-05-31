const mongoose = require('mongoose');
const validator = require('validator');

var SiteSchema = mongoose.Schema({
  site_code: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isURL,
      message: '{VALUE} is not a valid url'
    }
  }
});

var Site = mongoose.model('Site', SiteSchema);

module.exports = {Site};
