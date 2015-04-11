State = require('ampersand-state');
DisplayObject = require('./display_object');
math = require('../lib/math')
Position = require('./position');

MoveableDisplayObject = DisplayObject.extend({
  props:{
    speed:{
      type:'number',
      default: 1
    },
    
  },

  moveInDirection:function(){
    if(this.direction===null || this.direction === undefined){ return }

    var change = math.polarToCartesian(this.speed,this.direction);
    console.log('change', change)
    this.position.x = this.position.x + change.x;
    this.position.y = this.position.y + change.y;
  },

  moveTowardsPosition:function(targetPosition){
    var pixelsPerMove = this.speed * 5;
    var diffX = this.position.xDifference(targetPosition);
    var diffY = this.position.yDifference(targetPosition);


    var absDiffX = Math.abs(diffX);
    var absDiffY = Math.abs(diffY);

    var totalDiff = absDiffX + absDiffY

    if( diffX!==0 ){
      if( diffY === 0  ){
        var absMoveX = pixelsPerMove;
      } else {
        var xRatio = absDiffX/totalDiff
        var absMoveX = pixelsPerMove * xRatio;
      }
      var xMove = Math.ceil( math.sign(diffX) * absMoveX );
      this.position.x = this.position.x + xMove;
    }

    if( diffY!==0 ){
      if( diffX === 0  ){
        var absMoveY = pixelsPerMove
      } else {
        var yRatio = absDiffY/totalDiff
        var absMoveY = pixelsPerMove * yRatio;
      }
      var yMove = Math.ceil( math.sign(diffY) * absMoveY );
      this.position.y = this.position.y + yMove;
    } 
  }
})

module.exports = MoveableDisplayObject