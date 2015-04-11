var assert = require("assert");
var expect = require("chai").expect;
var DisplayObject = require("../models/display_object.js");

it('should have a default position',function(){
  var displayObject = new DisplayObject();
  expect(displayObject.position.x).to.equal(0);
  expect(displayObject.position.y).to.equal(0);
})