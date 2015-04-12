var AmpersandView = require('ampersand-view');

var TeamView = AmpersandView.extend({
    template: "<div class='team'> <h4 data-hook=groupsize></h4><ul class='formations'></ul> </div>",

    events: {
      "click [data-hook=change-formation]": "clickFormation"
    },

    bindings: {
      'model.groupSize': '[data-hook=groupsize]',
    },

    render:function(){
      this.renderWithTemplate();
      var formations = this.model.groupOptions();
      var ul = this.el.querySelector('ul.formations')
      formations.forEach(function(formation, index){
        var li = document.createElement('li');
        li.setAttribute('data-hook', 'change-formation')
        li.setAttribute('data-formation-index', index)
        li.innerHTML = formation.sizeGroup;
        ul.appendChild(li);
      },this)
      return this;
    },
    clickFormation:function(ev){
      console.log('clicked ev', ev);
      var index = ev.delegateTarget.getAttribute('data-formation-index');
      console.log('index', index);
      this.model.setGroupLayout(index);
    }

});

module.exports = TeamView;