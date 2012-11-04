/**
 * Created with JetBrains WebStorm.
 * User: Tim
 * Date: 3/11/12
 * Time: 17:44
 * To change this template use File | Settings | File Templates.
 */
var _instance = T4T.GameEngine.GetInstance();

_instance.spr.castle = new _instance.Sprite('images/sprites/castle.jpg', 1, 32, 43)


_instance.obj.shooter = {
    
};

var _CastleX = 10;
var _CastleY = 100;

_instance.obj.castle = {
    mask: _instance.spr.castle.mask,
    initialize: function(t){
        t.x = _CastleX;
        t.y = _CastleY;
        t.angle = 0;
    },


    tick: function(t){

        if(_instance.key.left.pressed){
            t.x -= 5;
        }

        if(_instance.key.right.pressed){
            t.x += 5;
        }
    },

    draw: function(t){
        _instance.draw.line(t.line(t).x1, t.line(t).y1, t.line(t).x2, t.line(t).y2);
        t.sprite.draw(t.x,t.y);
    },
    
    sprite: _instance.spr.castle,

    center: function (t) {
        return {
            x:t.x,
            y:t.y
        }
    },

    line: function (t) {
        var c = calculate(t.x, t.y, t.angle, t.angleStep, t.radius);
        t.angle = c.angle;
        t.angleStep = c.angleStep
        return {
            x1: t.x,
            y1: t.y,
            x2: c.x,
            y2: c.y
        };
    },
    radius: 100,
    angle: 1,
    angleStep:-0.02
};

function calculate(x, y, angle, angleStep, radius){
    angle += angleStep;

    var x1 = x+radius * Math.cos (angle);
    var y1 = y + radius * Math.sin (angle);

    if(x1 < x){
        angleStep = Math.abs(angleStep);
        console.log("x hit   " + angle);
    }

    if(y1 > y){
        console.log("y hit !  " + angle);
        angleStep = -angleStep;
    }
    
    return {
        x: x1,
        y: y1,
        angle: angle,
        angleStep: angleStep
    };
};