
_instance.obj.powerBar = {
    initialize: function (t) {
        t.x = _CastleX - _CastleWidth / 2 - 5;
        t.y = _CastleY + _CastleHeight / 2 + 20;
        t.length = t.x + _CastleWidth + 25;
    },

    tick: function (t) {
        if (t.enabled) {

            if (_instance.key.enter.pressed && t.enabled) {
                var _composedPower = t.power * 0.6;
                var _composedAngle = t.parent.angle;

                log.info("shoot a bullet with vector (" + _composedPower + ", " + _composedAngle + ")");
                _instance.obj.cannonBall.speed = _composedPower;
                _instance.obj.cannonBall.angle = _composedAngle;

                _instance.obj.cannonBall.moveVector = new Vector(_composedPower * Math.cos(_composedAngle), _composedPower * Math.sin(_composedAngle));
                _instance.obj.cannonBall.alive = true;

            }

            t.power += t.tickSpeed;
            t.powerLine(t);

            //if (t.cannonBall && t.cannonBall.alive) {
            //    t.cannonBall.tick(t.cannonBall);
            //}
        }
    },

    draw: function (t) {
        if (t.enabled) {
            _instance.draw.line(t.x, t.y, t.length, t.y);
            _instance.draw.line(t.power, t.y - 10, t.power, t.y + 10);

            //if (t.cannonBall && t.cannonBall.alive) {
            //    t.cannonBall.draw(t.cannonBall);
            //}
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
    cannonBall: null,
    parent: null,
    power: 0,
    length: 0,
    tickSpeed: 5,
    enabled: false
};