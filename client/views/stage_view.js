
var SpriteView = require('./sprite_view')

var StageView = function(spec){
  var horizontalTexture = PIXI.Texture.fromImage("horizontal.png");
  var verticalTexture = PIXI.Texture.fromImage("vertical.png");
  //set up stage
  this.drawCount = 0
  this.complete = false;
  this.stage = spec.stage;
  this.renderer = spec.renderer;
  this.inHit = false;

  //set up heroteam
  this.heroTeamSpriteView = spec.heroTeamSpriteView;
  this.stage.addChild(this.heroTeamSpriteView.sprite);

  //clicks change position
  this.heroTeamSpriteView.sprite.interactive = true;
  this.heroTeamSpriteView.sprite.mouseup = function(data){
    this.heroTeamSpriteView.model.vertical = !this.heroTeamSpriteView.model.vertical
    // this shouldnt be in here should be handled by view or even sprite
    if(this.heroTeamSpriteView.model.vertical){
      this.heroTeamSpriteView.sprite.setTexture(verticalTexture);
    }else{
      this.heroTeamSpriteView.sprite.setTexture(horizontalTexture);
    }
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
      this.checkHelpeeContact();
      this.checkHeroContact();
      this.updatePositions();
    }
    this.renderer.render(this.stage);


    if(!this.complete && !this.helpeeSpriteView.model.stuck){
      requestAnimationFrame(this.animate.bind(this));
    } else{
      if(this.complete){
        alert("Level Complete, good work")
      }else{
        alert("Ah man, friend is in trouble")
      }
    }
    
    this.drawCount++;
  },
  updatePositions:function(){
    this.heroTeamSpriteView.model.moveTowardsTarget();
    this.helpeeSpriteView.model.moveInDirection();
  },

  checkComplete:function(){
    if(this.helpeeSpriteView.model.position.distanceTo(this.targetSpriteView.model.position) < 15){
      this.complete = true;
    }
  },
  checkHeroContact:function(){
    this.spriteViews.forEach(function(spriteView){
      if(this.heroTeamSpriteView.model.hasHit(spriteView.model)){
        if(!this.heroTeamSpriteView.model.inHit){
          this.heroTeamSpriteView.model.inHit = true;
          console.log('setting target to null')
          this.heroTeamSpriteView.model.target = null
        }else{
          this.heroTeamSpriteView.model.inHit = false
        }
      }
    },this)
  },

  checkHelpeeContact:function(){
    var helpee = this.helpeeSpriteView.model;

    var checkContact = function(obj){
      if(helpee.hasHit(obj)){
        if(!helpee.inHit){
          helpee.inHit = true;
          if(obj.hazard){
            console.log('inhazaerd')
            helpee.stuck = true;
          }
          if(obj.vertical){
            this.helpeeSpriteView.model.direction = (Math.PI) - this.helpeeSpriteView.model.direction;
          } else{
            this.helpeeSpriteView.model.direction = (Math.PI*2) - this.helpeeSpriteView.model.direction;
          }
        }
      }else{
        helpee.inHit = false
      }
    }.bind(this)

    checkContact(this.heroTeamSpriteView.model)

    this.spriteViews.forEach(function(spriteView){
      checkContact(spriteView.model)
    },this)

    
  }
}

module.exports = StageView;