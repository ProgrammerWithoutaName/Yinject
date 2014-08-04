'use strict';

var Cache = function (propertyBuilder) {
    this._propertyBuilder = propertyBuilder;
    this._cache = {};
    this._emptyCache = function () { return; };
};

Cache.prototype.get = function (id) {
    // if cache[id] doesn't have anything, return nothing. silent fail, returns undefined.
    return (this._cache[id] || this._emptyCache)();
};

Cache.prototype.getProp = function (id) {
    return this._cache[id];
};

Cache.prototype.set = function (id, value) {
    if (this._cache[id] === undefined) {
        this._cache[id] = this._propertyBuilder.createProperty();
    }

    this._cache[id](value);
};

Cache.prototype.setProp = function (id, property) {
    this._cache[id] = property;
};

Cache.prototype.addGetEvent = function (id, onGetCallback) {
    if (this._cache[id] === undefined) {
        this._cache[id] = this._propertyBuilder.createProperty();
    }

    if (onGetCallback !== undefined) {
        this._cache[id].addGetEvent(onGetCallback);
    }
};

Cache.prototype.removeGetEvent = function (id, onGetCallback) {
    if (this._cache[id] !== undefined) {
        if (onGetCallback !== undefined) {
            this._cache[id].removeGetEvent(onGetCallback);
        }
    }
};

Cache.prototype.addSetEvent = function (id, onSetCallback) {
    if (this._cache[id] === undefined) {
        this._cache[id] = this._propertyBuilder.createProperty();
    }

    if (onSetCallback !== undefined) {
        this._cache[id].addSetEvent(onSetCallback);
    }
};

Cache.prototype.removeSetEvent = function (id, onSetCallback) {
    if (this._cache[id] !== undefined) {
        if (onSetCallback !== undefined) {
            this._cache[id].removeSetEvent(onSetCallback);
        }
    }
};

module.exports.Cache = Cache;