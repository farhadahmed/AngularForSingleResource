'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/quotes_test';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

var Quote = require('../models/Quote');

describe('quotes REST api', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a new quote', function(done) {
    chai.request('localhost:3000')
      .post('/api/quotes')
      .send({quoteBody: 'test quote'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.quoteBody).to.eql('test quote');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should get an array of quotes', function(done) {
    chai.request('localhost:3000')
    .get('/api/quotes')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(Array.isArray(res.body)).to.eql(true);

      done();
    });
  });

  describe('needs an existing quote to work with', function() {
    beforeEach(function(done) {
      var testQuote = new Quote({quoteBody: 'test quote'});
      testQuote.save(function(err, data) {
        if(err) throw err;

        this.testQuote = data;
        done();
      }.bind(this));
    });

    it('should be able to make a quote in a beforeEach block', function() {
      expect(this.testQuote.quoteBody).to.eql('test quote');
      expect(this.testQuote).to.have.property('_id');
    });

    it('should update a quote', function(done) {
      var id = this.testQuote._id;
      chai.request('localhost:3000')
      .put('/api/quotes/' + id)
      .send({quoteBody: 'here is a new quote'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('success');
        done();
      });
    });

    it('should be able to delete a quote', function(done) {
      chai.request('localhost:3000')
        .del('/api/quotes/' + this.testQuote._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });
  })
})
