DisplayObject = require('./display_object');
HeroTeam = require('./hero_team');

Hazard = DisplayObject.extend({
  hazard:true,
  props:{
    protector:'object',
    protectorPrimes:'array'
  },
  protected:function(){
    if(!this.protector || !this.protectorPrimes || this.protectorPrimes.length === 0){return false}
    return this.protectorPrimes.some(function(prime){
      return prime === this.protector.groupSize
    },this)
  }

})

module.exports = Hazard