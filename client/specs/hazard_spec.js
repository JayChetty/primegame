var assert = require("assert");
var expect = require("chai").expect;
var Hazard = require("../models/hazard.js");

it('should be a hazard',function(){
  var hazard = new Hazard();
  expect(hazard.hazard).to.equal(true);
})

it('should be not be protected',function(){
  var hazard = new Hazard();
  expect(hazard.protected()).to.equal(false);
})

it('should be able to be protected',function(){
  var hazard = new Hazard({protectorPrimes:[2]});
  var stoogeProtector = {groupSize:2};
  hazard.protector = stoogeProtector;
  expect(hazard.protected()).to.equal(true);
})