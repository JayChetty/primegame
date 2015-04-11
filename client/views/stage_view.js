
var SpriteView = require('./sprite_view')

var StageView = function(spec){
  //set up stage
  this.drawCount = 0
  this.complete = false;
  this.stage = spec.stage;
  this.renderer = spec.renderer;

  //set up heroteam
  this.heroTeamSpriteView = spec.heroTeamSpriteView;
  this.stage.addChild(this.heroTeamSpriteView.sprite);

  //clicks change position
  this.heroTeamSpriteView.sprite.interactive = true;
  this.heroTeamSpriteView.sprite.mouseup = function(data){
    this.heroTeamSpriteView.model.vertical = !this.heroTeamSpriteView.model.vertical
  }.bind(this)

  //go to clicks on stage
  this.stage.mousedown = function(data){
    this.heroTeamSpriteView.model.target = { position: { x:data.global.x, y:data.global.y }}
  }.bind(this)

  //set up helpee
  this.helpeeSpriteView = spec.helpeeSpriteView;
  this.stage.addChild(this.helpeeSpriteView.sprite);

  //setup target
  this.targetSpriteView = spec.targetSpriteView;
  this.stage.addChild(this.targetSpriteView.sprite);

  //add other objects(hazards etc)
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
      this.checkComplete();
      this.checkContact();
      this.updatePositions();
    }
    this.renderer.render(this.stage);
    if(!this.complete){
      requestAnimationFrame(this.animate.bind(this));
    } else{
      alert("Level Complete, good work")
    }
    
    this.drawCount++;
  },
  updatePositions:function(){
    this.heroTeamSpriteView.model.moveTowardsTarget();
    this.helpeeSpriteView.model.moveInDirection();
  },

  checkComplete:function(){
    if(this.helpeeSpriteView.model.position.distanceTo(this.targetSpriteView.model.position) < 10){
      this.complete = true;
    }
  },

  checkContact:function(){
    if(this.helpeeSpriteView.model.position.distanceTo(this.heroTeamSpriteView.model.position) < 10){
      if(this.heroTeamSpriteView.model.vertical){
        this.helpeeSpriteView.model.direction = (Math.PI) - this.helpeeSpriteView.model.direction
      } else{
        this.helpeeSpriteView.model.direction = (Math.PI*2) - this.helpeeSpriteView.model.direction   
      }
    }
  }
}

module.exports = StageView;