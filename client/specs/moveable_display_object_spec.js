var assert = require("assert");
var expect = require("chai").expect;
var MoveableDisplayObject = require("../models/moveable_display_object.js");

it('should have a default position',function(){
  var moveableDisplayObject = new MoveableDisplayObject();
  expect(moveableDisplayObject.position.x).to.equal(0);
  expect(moveableDisplayObject.position.y).to.equal(0);
})

it('should a default speed',function(){
  var moveableDisplayObject = new MoveableDisplayObject();
  expect(moveableDisplayObject.speed).to.equal(1);
})

it('should be able to move towards a position',function(){
  var moveableDisplayObject = new MoveableDisplayObject();
  var targetPosition = new Position({x:100,y:0});
  moveableDisplayObject.moveTowardsPosition(targetPosition);
  expect(moveableDisplayObject.position.y).to.equal(0);
  expect(moveableDisplayObject.position.x).to.equal(5);
})

