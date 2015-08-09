'use strict';

var Quote = require('../models/Quote');
var bodyparser = require('body-parser');

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/quotes', function(req, res) {
    Quote.find({}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error for get'});
      }

      res.json(data);
    });
  });

  router.post('/quotes', function(req, res) {
    var newNote = new Quote(req.body);
    newNote.save(function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error for post'});
      }

      res.json(data);
    });
  });

  router.put('/quotes/:id', function(req, res) {
    var updatedNote = req.body;
    delete updatedNote._id;

    Quote.update({'_id': req.params.id}, updatedNote, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error for put'});
      }

      res.json({msg: 'success'});
    });
  });

  router.delete('/quotes/:id', function(req, res) {
    Quote.remove({'_id': req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error for delete'});
      }

      res.json({msg: 'success'});
    });
  });
};
