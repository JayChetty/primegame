var SpriteView = function(spec){
  var spec = spec || {}
  this.model = spec.model;
  this.sprite = spec.sprite;
  this.syncPosition();
  this.model.on('change',function(){
    this.syncPosition();
  },this)
}


SpriteView.prototype = {
  syncPosition:function(){
    this.sprite.position.x = this.model.position.x;
    this.sprite.position.y = this.model.position.y;
  },
}

module.exports = SpriteView