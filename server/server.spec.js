'use strict';
var Yo = require('./yo');
var should = require('chai').should;
var expect = require('chai').expect;

describe('server', function(){
  var scope;

  it('should run server tests', function(){
    Yo();
    expect(true).to.be.true();
    console.log('testing')
  });
});
