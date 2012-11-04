/**
 * Created with JetBrains WebStorm.
 * User: Tim
 * Date: 3/11/12
 * Time: 14:51
 * To change this template use File | Settings | File Templates.
 */

if(!T4T){
    var T4T = {};
}

T4T.GameEngine = (function(){
    "use strict";
    var _GameLoop = true,
        _Width = 400,
        _Height = 400,
        _FrameRate = 15,
        _KeyList = new Array(),
        _Canvas; //holds the canvas element which we dynamically add to the root content item.

    var spr=PP.spr,rm=PP.rm,obj=PP.obj,snd=PP.snd,al=PP.al,global=PP.global,Alarm=PP.Alarm,collision=PP.collision,draw=PP.draw,init=PP.init,key=PP.key,load=PP.load,loop=PP.loop,mouse=PP.mouse,physics=PP.physics,Sound=PP.Sound,SoundEffect=PP.SoundEffect,Sprite=PP.Sprite,view=PP.view,walkDown=PP.walkDown;

    var _objects = new Array(obj);

    function GameEngine(){

        this.obj = function(){
            return obj;
        }();

        this.spr = function(){
            return spr;
        }();

        this.key = function(){
            return key;
        }();

        this.draw = function(){
            return draw;
        }();

        this.spr = function(){
            return spr;
        }();

        this.Sprite = Sprite;

        this.addObj = function (g){
            _objects.push(g);
        }

        this.init = function(width, height, contentdiv, framerate){
            _Canvas = document.createElement('canvas');
            _Canvas.id = "game";
            _Canvas.height = _Height = height;
            _Canvas.width = _Width = width;


            document.getElementById(contentdiv).appendChild(_Canvas);

            init('game',width,height);
            _FrameRate = loop.rate = framerate;

            load(function(){

            });

            rm.play = function(){
              /*var ballCreator = new Alarm(function(){
                  var ball = obj.ball;
                  loop.beget(ball);
                  this.time = loop.rate * .5;
              });
                ballCreator.time = 0;*/
               //loop.register(obj.ball, 0, 0);
                for(var i = 0; i < _objects.length; i++){
                    loop.register(_objects[i], 0, 0);
                }
            };

            loop.active = true;
            loop.room = rm.play;

        }

    };

    var instance;  // this is our instance holder

    /**
     * This is an emulation of static variables and methods
     */
    var _static = {
        /**
         * This is a method for getting an instance. it returns a singleton instance of a singleton object
         * @method getInstance
         * @return singleton instance of the LifeFactory object
         */
        GetInstance: function () {
            if (instance === undefined) {
                instance = new GameEngine(); //create new instance of the LifeFactory object ONLY if the instance has not yet been set.
            }
            return instance;
        }
    };

    return _static;

})();



