'use strict';

var mongoose = require('mongoose');

var quoteSchema = mongoose.Schema({
  source: String,
  quoteBody: String
});

module.exports = mongoose.model('Note', quoteSchema);
