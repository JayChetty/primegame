State = require('ampersand-state');

var Position = State.extend({
  props:{
    x:{
      type:'number',
      default:0
    },
    y:{
      type:'number',
      default:0
    }
  },

  xDifference: function(targetPosition){
    return targetPosition.x - this.x;
  },
  yDifference: function(targetPosition){
    return targetPosition.y - this.y;
  },

  distanceTo: function(targetPosition){
    var absdiffX = Math.abs(this.xDifference(targetPosition))
    var absdiffY = Math.abs(this.yDifference(targetPosition))
    return Math.sqrt(Math.pow(absdiffX,2) + Math.pow(absdiffY,2))
  }
})

module.exports = Position