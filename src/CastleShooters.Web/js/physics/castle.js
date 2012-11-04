/// <reference path="../libs/propulsionjs.js" />
/// <reference path="../libs/blackbird.js" />
/// <reference path="../engine/core/core.js" />
/// <reference path="../engine/utils/messenger.js" />

/**
 * Created with JetBrains WebStorm.
 * User: Tim
 * Date: 3/11/12
 * Time: 17:44
 * To change this template use File | Settings | File Templates.
 */
var _instance = T4T.GameEngine.GetInstance();
_instance.spr.castle = new _instance.Sprite('images/sprites/castle.jpg', 1, 32, 43);


var _CastleX = 50,
    _CastleY = 750,
    _CastleWidth = 80,
    _CastleHeight = 80;




_instance.obj.powerBar = {
    initialize: function (t) {
        t.x = _CastleX - _CastleWidth / 2 - 5;
        t.y = _CastleY + _CastleHeight / 2 + 20;
        t.length = t.x + _CastleWidth + 25;
    },

    tick: function (t) {
        if (t.enabled) {
            t.power += t.tickSpeed;
            t.powerLine(t);
            
            if (_instance.key.enter.pressed) {
                log.info("shoot a bullet with vector (" + t. power / 100 + ", " + t.host.angle + ")");
            }
        }
    },

    draw: function (t) {
        if (t.enabled) {
            _instance.draw.line(t.x, t.y, t.length, t.y);
            _instance.draw.line(t.power, t.y - 10, t.power, t.y + 10);
        }
    },
    powerLine: function (t) {
        
        if (t.tickSpeed > 0 && t.power >= t.length) {
            t.tickSpeed = -t.tickSpeed;
            log.info("tickspeed reversed!" + t.power);
        }

        if (t.tickSpeed < 0 && t.power <= 0) {
            t.tickSpeed = -t.tickSpeed;
            log.info("tickspeed reversed!" + t.power);
        }
        
    },
    power:0,
    length:0,
    tickSpeed:5,
    enabled: false,
    host: null,
};


_instance.obj.castle = {
    mask: _instance.spr.castle.mask,
    
    initialize: function (t) {
        t.x = _CastleX;
        t.y = _CastleY;
        t.angle = 0;
        t.powerBar.host = t;
    },
    
    tick: function (t) {

        if (_instance.key.left.pressed) {
            t.x -= 5;
        }

        if (_instance.key.right.pressed) {
            t.x += 5;
        }

        if (_instance.key.enter.pressed && t.angleStep !== 0) {
            t.angleStep = 0;
            t.choosePower(t);
        }
    },

    draw: function (t) {
        _instance.draw.line(t.line(t).x1, t.line(t).y1, t.line(t).x2, t.line(t).y2);
        t.sprite.draw(t.x, t.y);
    },

    sprite: _instance.spr.castle,

    center: function (t) {
        return {
            x: t.x,
            y: t.y
        };
    },

    line: function (t) {
        var c = calculate(t.x, t.y, t.angle, t.angleStep, t.radius);
        t.angle = c.angle;
        t.angleStep = c.angleStep;
        return {
            x1: t.x,
            y1: t.y,
            x2: c.x,
            y2: c.y
        };
    },

    choosePower: function (t) {
        t.powerBar.enabled = true;
    },

    powerBar: _instance.obj.powerBar,

    radius: 100,

    angle: 1,

    angleStep: -0.02,

};

function calculate(x, y, angle, angleStep, radius) {
    angle += angleStep;

    var x1 = x + radius * Math.cos(angle);
    var y1 = y + radius * Math.sin(angle);

    if (angleStep !== 0) {

        if (x1 < x) {
            angleStep = Math.abs(angleStep);
            log.info("x hit   " + angle);
        }

        if (y1 > y) {
            log.info("y hit !  " + angle);
            angleStep = -angleStep;
        }
    }


    return {
        x: x1,
        y: y1,
        angle: angle,
        angleStep: angleStep
    };
};