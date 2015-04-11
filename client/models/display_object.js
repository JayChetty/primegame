State = require('ampersand-state');
Position = require('./position');
var DisplayObject = State.extend({
  props:{
    hazard:{
      type:'boolean',
      default:false
    }
  },
  children:{
    position:Position
  },
})

module.exports = DisplayObject