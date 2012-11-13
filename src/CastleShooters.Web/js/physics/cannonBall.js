
_instance.obj.cannonBall = {
    initialize: function (t) {

        t.x = _CastleX - _CastleWidth / 2;
        t.y = _CastleY + _CastleHeight / 2;
        //log.info("drawing cannon: " + t.x + "  " + t.y);

    },

    draw: function (t) {
        if (t.alive) {
            //log.info("drawing cannon: " + t.x + "  "  + t.y);
            _instance.draw.circle(t.x, t.y, 30, false, "Red");
        }
    },

    tick: function (t) {
        if (t.alive) {
            // t.moveVector = t.calculatePhysics(t.moveVector);

            log.info("drawing cannon: " + t.moveVector.y + "  " + t.gravity);
            t.x += t.moveVector.x * t.tickSpeed;
            t.y += t.moveVector.y * t.tickSpeed;

            t.moveVector.y -= t.gravity;

        }
    },

    moveVector: new Vector(),
    calculatePhysics: function (v) {
        //gravity
        v.y += t.gravity;
        // _instance.physics.jump(v, v.x, -1);
        return v;
    },
    angle: 0,
    speed: 0,
    gravity: -3,
    tickSpeed: 1.5,
    alive: false,
    parent: null
};



