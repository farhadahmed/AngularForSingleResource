'use strict';

module.exports = function(app) {
  require('./controllers/quotes_controller')(app);
};
