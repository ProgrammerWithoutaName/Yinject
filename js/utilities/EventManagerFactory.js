'use strict';

var EventManager = function () {
    this._eventCallbacks = [];
};

EventManager.prototype._getEventIndex = function (id) {
    var i;
    for (i = 0; i < this._eventCallbacks.length; i++) {
        if (this._eventCallbacks[i].id === id) {
            return i;
        }
    }
    return -1;
};

EventManager.prototype.setEvent = function (id, eventCallback) {
    var index = this._getEventIndex(id);

    if (index < 0) {
        this._eventCallbacks.push({id: id, callback: eventCallback});
    } else {
        this._eventCallbacks[index].callback = eventCallback;
    }
};

EventManager.prototype.removeEvent = function (id) {
    var index = this._getEventIndex(id);
    if (index >= 0) {
		this._eventCallbacks.splice(index, 1);
    }
};

EventManager.prototype.callEvent = function (sender, args) {
    var i;
    for (i = 0; i < this._eventCallbacks.length; i++) {
        this._eventCallbacks[i].callback(sender, args);
    }
};



var EventManagerFactory = function () { return; };

EventManagerFactory.prototype.createEventManager = function () {
    return new EventManager();
};

module.exports.EventManagerFactory = EventManagerFactory;
module.exports.EventManager = EventManager;