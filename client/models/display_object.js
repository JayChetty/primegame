State = require('ampersand-state');
Position = require('./position');
var DisplayObject = State.extend({
  children:{
    position:Position
  },
})

module.exports = DisplayObject