var HeroSpriteView = function(spec){
  var spec = spec || {}
  this.blobTexture = PIXI.Texture.fromImage("blob2.png");
  this.horizontalTexture = PIXI.Texture.fromImage("horizontal.png");
  this.verticalTexture = PIXI.Texture.fromImage("vertical.png");
  this.model = spec.model;
  this.sprite = spec.sprite;
  this.syncPosition();
  this.model.on('change',function(){
    this.syncPosition();
  },this)

  this.model.on('change:groupSize',function(){
    this.setGroupTexture();
  },this)

  this.model.on('change:vertical',function(){
    this.setWallTexture();
  },this)

  //clicks change position
  this.sprite.interactive = true;
  this.sprite.mouseup = function(data){
    if(this.model.groupSize ===2){
      this.model.vertical = !this.model.vertical
      this.setWallTexture();
    }
  }.bind(this)
}


HeroSpriteView.prototype = {
  setWallTexture:function(){
    if(this.model.vertical){
      this.sprite.setTexture(this.verticalTexture);
    }else{
      this.sprite.setTexture(this.horizontalTexture);
    }
  },
  syncPosition:function(){
    this.sprite.position.x = this.model.position.x;
    this.sprite.position.y = this.model.position.y;
  },
  setGroupTexture:function(){
    var texture = null
    switch(this.model.groupSize){
      case 2:
        this.setWallTexture();
        break;
      case 3:
        this.sprite.setTexture(this.blobTexture);
        break;
      default:
        this.sprite.setTexture(this.blobTexture);
        break;
    }
  }
}

module.exports = HeroSpriteView