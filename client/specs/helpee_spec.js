var assert = require("assert");
var expect = require("chai").expect;
var Helpee = require("../models/helpee.js");

it('should have a default position',function(){
  var helpee = new Helpee();
  expect(helpee.position.x).to.equal(0);
  expect(helpee.position.y).to.equal(0);
})

it('should have a direction',function(){
  var helpee = new Helpee();
  expect(helpee.direction).to.equal(0);
})
