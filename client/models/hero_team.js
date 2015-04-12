var MoveableDisplayObject = require('./moveable_display_object');
var primes = require('./primes')

var app = require('ampersand-app');
var HeroTeam = MoveableDisplayObject.extend({
  props: {
    target:'object',
    vertical:'boolean',
    size:{
      type:'number',
      default:2
    },
    groupSize:'number',
    numGroups:'number',
  },
  initialize:function(){
    this.deflector = true;
    var defaultGrouplayout = this.groupOptions()
    this.setGroupLayout(0);
  },
  setGroupLayout:function(index){
    var groupLayout = this.groupOptions()[index];
    this.groupSize = groupLayout.sizeGroup;
    this.numGroups = groupLayout.numGroups;
    if(this.groupSize == 2){
      this.deflector = true;
    }else{
      this.deflector = false;
    }
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
  },

  groupOptions: function(){
    var primeIndex  = primes.indexOf(this.size)
    var isPrime = primeIndex > -1;
    if(isPrime){//quick exit if prime
      return [ { numGroups:1, sizeGroup:this.size } ];
    }

    var primeFactors = primes.filter(function(prime){
      return this.size%prime == 0;
    }, this)

    return primeFactors.map(function(primeFactor){
      return {numGroups:(this.size/primeFactor),sizeGroup:primeFactor}
    }, this)

  }
})

module.exports = HeroTeam