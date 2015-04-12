var StageView = require('./views/stage_view');
var TeamView = require('./views/team_view');
var DisplayObject = require('./models/display_object');
var Hazard = require('./models/hazard');
var HeroTeam = require('./models/hero_team');
var Helpee = require('./models/helpee')
var SpriteView = require('./views/sprite_view');
var HeroSpriteView = require('./views/hero_sprite_view');
var app = require('ampersand-app');

window.onload = function(){

	// You can use either PIXI.WebGLRenderer or PIXI.CanvasRenderer
	var renderer = new PIXI.WebGLRenderer(800, 600);
  var blobTexture = PIXI.Texture.fromImage("blob2.png");
  var horizontalTexture = PIXI.Texture.fromImage("horizontal.png");
  var hazardTexture = PIXI.Texture.fromImage("hazard.png");
  
  //set up models
  var heroTeamModel = new HeroTeam({speed: 1, size:6})
  var helpeeModel = new Helpee({speed: 1, position:{x:100,y:200}, direction:Math.PI *(1/4)})
  var targetModel = new DisplayObject({position:{x:500,y:500}})

  var wallModel = new DisplayObject({ position:{x:200,y:100}, deflector:true})

  var hazardModel = new Hazard({speed: 1, position:{x:400,y:300}, protectorPrimes:[3]})

  //and sprites
  var heroTeamSprite = new PIXI.Sprite(horizontalTexture);
  var targetSprite = new PIXI.Sprite(blobTexture);
  var helpeeSprite = new PIXI.Sprite(blobTexture);

  var hazardSprite = new PIXI.Sprite(hazardTexture);
  var wallSprite = new PIXI.Sprite(horizontalTexture);

  //create views
  var spriteViews = [];//add additional object to this eg hazards
  var hazardSpriteView = new SpriteView({ model:hazardModel, sprite:hazardSprite });
  var wallSpriteView = new SpriteView({ model:wallModel, sprite:wallSprite });
  spriteViews.push(hazardSpriteView)
  spriteViews.push(wallSpriteView)

  var targetView = new SpriteView({ model:targetModel, sprite:targetSprite });
  var heroTeamView = new HeroSpriteView({ model:heroTeamModel, sprite:heroTeamSprite });
  var helpeeView = new SpriteView({ model:helpeeModel, sprite:helpeeSprite });
  //create stage
  var interactive = true;
  var stage = new PIXI.Stage(0x66FF99, interactive);

  var teamView = new TeamView({model:heroTeamModel})
  document.body.appendChild(teamView.render().el)


  //create view for the stage and sprites
  var stageView = new StageView({
    renderer:renderer,
    heroTeamSpriteView: heroTeamView,
    stage: stage,
    spriteViews:spriteViews,
    helpeeSpriteView: helpeeView,
    targetSpriteView:targetView
  })
  document.body.appendChild(stageView.renderer.view);


	
}

