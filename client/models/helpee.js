MoveableDisplayObject = require('./moveable_display_object');

var app = require('ampersand-app');
var Helpee = MoveableDisplayObject.extend({
  props: {
    direction:{
      type:'number',
      default: 0
    }
  },
})

module.exports = Helpee