module.exports = {
  sign: function(x){ 
    return x > 0 ? 1 : x < 0 ? -1 : 0; 
  },

  polarToCartesian:function(magnitude, angle){
    x = magnitude * Math.cos(angle);
    y = magnitude * Math.sin(angle);
    return {x:x,y:y}
  }
}