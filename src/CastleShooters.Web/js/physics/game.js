/**
 * Created with JetBrains WebStorm.
 * User: Tim
 * Date: 3/11/12
 * Time: 15:21
 * To change this template use File | Settings | File Templates.
 */

(function(){
    var width = 400;
    var height = 400;

    var _Engine = T4T.GameEngine.GetInstance();
    _Engine.addObj(_instance.obj.castle);
    _Engine.addObj(_instance.obj.powerBar);
    _Engine.init(1050,1000, "content", 10);
})();