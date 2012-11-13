
var _instance = T4T.GameEngine.GetInstance();
_instance.spr.castle = new _instance.Sprite('images/sprites/castle.jpg', 1, 32, 43);

var Vector = function (x, y) {
    this.x = x;
    this.y = y;
};


var _CastleX = 50,
    _CastleY = 750,
    _CastleWidth = 80,
    _CastleHeight = 80;