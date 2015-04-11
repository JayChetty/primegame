var StageView = require('./views/stage_view');
var DisplayObject = require('./models/display_object');
var HeroTeam = require('./models/hero_team')
var SpriteView = require('./views/sprite_view');
var app = require('ampersand-app');

window.onload = function(){

	// You can use either PIXI.WebGLRenderer or PIXI.CanvasRenderer
	var renderer = new PIXI.WebGLRenderer(800, 600);
  var blobTexture = PIXI.Texture.fromImage("blob2.png");
  
  //set up models
  var heroTeamModel = new HeroTeam({speed: 1})
  var wallModel = new DisplayObject({speed: 1, position:{x:100,y:100}})

  //and sprites
  var heroTeamSprite = new PIXI.Sprite(blobTexture);
  var wallSprite = new PIXI.Sprite(blobTexture);

  //create views
  var spriteViews = [];
  var wallView = new SpriteView({ model:wallModel, sprite:wallSprite });
  spriteViews.push(wallView);
  var heroTeamView = new SpriteView({ model:heroTeamModel, sprite:heroTeamSprite });

  //create stage
  var interactive = true;
  var stage = new PIXI.Stage(0x66FF99, interactive);

  //create view for the stage and sprites
  var stageView = new StageView({
    renderer:renderer,
    heroTeamSpriteView: heroTeamView,
    stage: stage,
    spriteViews:spriteViews,
  })

	document.body.appendChild(stageView.renderer.view);
}
