var StageView = require('./views/stage_view');
var DisplayObject = require('./models/display_object');
var HeroTeam = require('./models/hero_team');
var Helpee = require('./models/helpee')
var SpriteView = require('./views/sprite_view');
var app = require('ampersand-app');

window.onload = function(){

	// You can use either PIXI.WebGLRenderer or PIXI.CanvasRenderer
	var renderer = new PIXI.WebGLRenderer(800, 600);
  var blobTexture = PIXI.Texture.fromImage("blob2.png");
  var horizontalTexture = PIXI.Texture.fromImage("horizontal.png");
  
  //set up models
  var heroTeamModel = new HeroTeam({speed: 1})
  var helpeeModel = new Helpee({speed: 1, position:{x:100,y:200}, direction:Math.PI *(1/4)})
  var targetModel = new DisplayObject({speed: 1, position:{x:500,y:500}})

  var hazardModel = new DisplayObject({speed: 1, position:{x:200,y:100}, hazard:true})

  //and sprites
  var heroTeamSprite = new PIXI.Sprite(horizontalTexture);
  var targetSprite = new PIXI.Sprite(blobTexture);
  var helpeeSprite = new PIXI.Sprite(blobTexture);
  var hazardSprite = new PIXI.Sprite(horizontalTexture);

  //create views
  var spriteViews = [];//add additional object to this eg hazards
  var hazardSpriteView = new SpriteView({ model:hazardModel, sprite:hazardSprite });
  spriteViews.push(hazardSpriteView)

  var targetView = new SpriteView({ model:targetModel, sprite:targetSprite });
  var heroTeamView = new SpriteView({ model:heroTeamModel, sprite:heroTeamSprite });
  var helpeeView = new SpriteView({ model:helpeeModel, sprite:helpeeSprite });
  //create stage
  var interactive = true;
  var stage = new PIXI.Stage(0x66FF99, interactive);

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

