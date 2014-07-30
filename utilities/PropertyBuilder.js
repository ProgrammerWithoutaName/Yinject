'use strict';

var PropertyBuilder = function (eventManagerBuilder) {
    this._eventManagerBuilder = eventManagerBuilder;
};

PropertyBuilder.prototype.buildProperty = function (getFunctionOverride, setFunctionOverride) {
    var getter, setter, watchedVariable;
    var getterEvents, setterEvents;
    var property;
    // base setup. set watched to null, and getters/setters to their correct values.
    watchedVariable = null;
    getter = getFunctionOverride || function () { return; };
    setter = setFunctionOverride || function () { return; };

    // setup event handlers
    this._eventManagerBuilder.buildEventManager();
    getterEvents = this._eventManagerBuilder.buildEventManager();
    setterEvents = this._eventManagerBuilder.buildEventManager();

    // is this a standard variable?
    if (arguments.length < 1) {
        property = function (setterVariable) {
            if (arguments.length > 0) {
                var old = watchedVariable;
                watchedVariable = setterVariable;
                setterEvents.callEvent(this, {oldValue: old, newValue: setterVariable});
            } else {
                getterEvents.callEvent(this, {});
            }
            return watchedVariable;
        };
    } else {
        property = function (setterVariable) {
            if (arguments.length > 0) {
                setterEvents.callEvent(this, {newValue: setterVariable});
                setter(setterVariable);
            } else {
                getterEvents.callEvent(this, {});
                return getter();
            }
        };
    }

    property.addSetEvent = function (callback) {
        setterEvents.setEvent(callback, callback);
    };

    property.removeSetEvent = function (callback) {
        setterEvents.removeEvent(callback);
    };

    property.addGetEvent = function (callback) {
        getterEvents.setEvent(callback, callback);
    };

    property.removeGetEvent = function (callback) {
        getterEvents.removeEvent(callback);
    };

    return property;
};

module.exports.PropertyBuilder = PropertyBuilder;