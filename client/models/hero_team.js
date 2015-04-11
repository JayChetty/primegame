MoveableDisplayObject = require('./moveable_display_object');

var app = require('ampersand-app');
var HeroTeam = MoveableDisplayObject.extend({
  props: {
    target:'object',
    vertical:'boolean'
  },
  moveTowardsTarget:function(){
    if(this.target && this.target.position){
      this.moveTowardsPosition(this.target.position)
      if(this.position.distanceTo(this.target.position)<this.speed*5){
        this.arrivedAtTarget()
      }
    }
  },
  arrivedAtTarget:function(){
    app.trigger('display-target', this.target)
    this.target = null;
  }
})

module.exports = HeroTeam