var assert = require("assert");
var expect = require("chai").expect;
var HeroTeam = require("../models/hero_team.js");

it('should have a default position',function(){
  var hero = new HeroTeam();
  expect(hero.position.x).to.equal(0);
  expect(hero.position.y).to.equal(0);
})

it('should be abe to have a target',function(){
  var moveableDisplayObject = new HeroTeam();
  moveableDisplayObject.target = {position:{x:100,y:0}};
  expect(moveableDisplayObject.target.position.x).to.equal(100);
  expect(moveableDisplayObject.target.position.y).to.equal(0);
})

it('should be abe to move torwards target position',function(){
  var moveableDisplayObject = new HeroTeam();
  moveableDisplayObject.target = {position:{x:100,y:0}};
  moveableDisplayObject.moveTowardsTarget();
  expect(moveableDisplayObject.position.y).to.equal(0);
  expect(moveableDisplayObject.position.x).to.equal(5);
})

it('should have a size', function(){
  var team = new HeroTeam({size:3});
  expect(team.size).to.equal(3);
})

it('size should default to 2', function(){
  var team = new HeroTeam();
  expect(team.size).to.equal(2);
})

it('should give out simple prime group for prime', function(){
  var team = new HeroTeam({size:3});
  expect(team.groupOptions()).to.deep.equal([{numGroups:1,sizeGroup:3}]);
})

it('should give prime group breakdown for composite', function(){
  var team = new HeroTeam({size:4});
  expect(team.groupOptions()).to.deep.equal([{numGroups:2,sizeGroup:2}]);
})

it('should give multiple for those with options', function(){
  var team = new HeroTeam({size:10});
  expect(team.groupOptions()).to.deep.equal([{numGroups:5,sizeGroup:2},{numGroups:2,sizeGroup:5}]);
})