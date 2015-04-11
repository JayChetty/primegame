
var SpriteView = require('./sprite_view')

var StageView = function(spec){
  //set up stage
  this.drawCount = 0
  this.stage = spec.stage;
  this.renderer = spec.renderer;

  //set up hero
  this.heroTeamSpriteView = spec.heroTeamSpriteView;
  this.heroTeamModel = this.heroTeamSpriteView.model
  this.spriteViews = spec.spriteViews;
  this.stage.addChild(this.heroTeamSpriteView.sprite);
  this.stage.mousedown = function(data){
    this.heroTeamSpriteView.model.target = { position: { x:data.global.x, y:data.global.y }}
  }.bind(this)

  //add other objects
  this.spriteViews.forEach(function(spriteView){
    console.log('spriteView', spriteView)
    this.stage.addChild(spriteView.sprite);
    spriteView.sprite.interactive = true;
    spriteView.sprite.mouseup = function(data){
      console.log('data', data);
      this.stageView.heroTeamSpriteView.model.target = this.target.model
    }.bind({stageView:this, target:spriteView})
  },this)

  //start animation
  requestAnimationFrame(this.animate.bind(this));
}

StageView.prototype = {
  animate: function(){
    if (this.drawCount%1===0){
      this.updateHeroPosition();
    }
    this.renderer.render(this.stage);
    requestAnimationFrame(this.animate.bind(this));
    this.drawCount++;
  },
  updateHeroPosition:function(){
    this.heroTeamSpriteView.model.moveTowardsTarget();
  },
}

module.exports = StageView;