'use strict';

var mongoose = require('mongoose');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/build'));

var quotesRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/quotes_development');

require('./routes/quotes_routes')(quotesRoutes);

app.use('/api', quotesRoutes);

app.listen(port, function() {
  console.log('Server running on port ' + port);
});
