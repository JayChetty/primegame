
var SpriteView = require('./sprite_view')

var StageView = function(spec){
  //set up stage
  this.drawCount = 0
  this.stage = spec.stage;
  this.renderer = spec.renderer;

  //set up heroteam
  this.heroTeamSpriteView = spec.heroTeamSpriteView;
  this.stage.addChild(this.heroTeamSpriteView.sprite);
  this.stage.mousedown = function(data){
    this.heroTeamSpriteView.model.target = { position: { x:data.global.x, y:data.global.y }}
  }.bind(this)

  //set up helpee
  this.helpeeSpriteView = spec.helpeeSpriteView;
  this.stage.addChild(this.helpeeSpriteView.sprite);

  //add other objects
  this.spriteViews = spec.spriteViews;
  this.spriteViews.forEach(function(spriteView){
    this.stage.addChild(spriteView.sprite);
    spriteView.sprite.interactive = true;
    spriteView.sprite.mouseup = function(data){
      this.stageView.heroTeamSpriteView.model.target = this.target.model
    }.bind({stageView:this, target:spriteView})
  },this)

  //start animation
  requestAnimationFrame(this.animate.bind(this));
}

StageView.prototype = {
  animate: function(){
    if (this.drawCount%1===0){
      this.updatePositions();
    }
    this.renderer.render(this.stage);
    requestAnimationFrame(this.animate.bind(this));
    this.drawCount++;
  },
  updatePositions:function(){
    this.heroTeamSpriteView.model.moveTowardsTarget();
    this.helpeeSpriteView.model.moveInDirection();
  },
}

module.exports = StageView;