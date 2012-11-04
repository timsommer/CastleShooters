/**
 * Util.Messenger is a simple implementation of the Observer pattern (Publish/Subscribe)
 * @author Tim Sommer
 * @namespace Util
 * @class Messenger
 */
if (!T4T) {
    var T4T = { };
}

if (!T4T.Util) {
    T4T.Util = { };
}

if (!T4T.Util.Messenger) {
    T4T.Util.Messenger = { };
}

(function (messenger) {
    "use strict";
    var topics = {},
      subUid = -1;

    /**
    * Publish or broadcast events of interest with a specific topic name and arguments such as the data to pass along
    * @method publish
    * @param {String} topic: topic to publish
    * @param {object} args: data to pass along
    * @return messenger instance
    */
    messenger.publish = function (topic, args) {
        if (!topics[topic]) {
            return false;
        }
        var subscribers = topics[topic],
          len = subscribers ? subscribers.length : 0;
        while (len--) {
            subscribers[len].func(topic, args);
        }
        return this;
    };


    /**
    * Subscribe to events of interest with a specific topic name and a callback function, to be executed when the topic/event is observed
    * @method subscribe
    * @param {String} topic: topic to publish
    * @param {function} func: callback function
    * @return token id that can be used to unsubscribe
    */
    messenger.subscribe = function (topic, func) {
        if (!topics[topic]) {
            topics[topic] = [];
        }
        var token = (++subUid).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };


    /**
     * Unsubscribe from a specific topic, based on a tokenized reference to the subscription
     * @method subscribe
     * @param {token} topic: token used to subscribe
     * @return messenger instance
     */
    messenger.unsubscribe = function (token) {
        for (var m in topics) {
            if (topics[m]) {
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return this;
    };
}(T4T.Util.Messenger));


//logHandler to test basic functionalities
var logHandler = function (topics, data) {
    "use strict";
    log.info(topics + ": " + data);
};


// Subscribers basically "subscribe" (or listen)
// And once they've been "notified" their callback functions are invoke
T4T.Util.Messenger.subscribe('AngleChosen', logHandler);
