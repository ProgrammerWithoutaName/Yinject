'use strict';


var PropertyBuilder = function (context) {
    this._context = context;
    this._properties = {};
};

PropertyBuilder.prototype._updatePropertyValue = function (name, attributes) {
    if (this._properties[name] === undefined) {
        this._properties[name] = {
            name: name,
            locked: !!attributes.configurable
        };
    } else {
        this._properties[name].locked = !!attributes.configurable;
    }
};

PropertyBuilder.prototype._canUpdateProperty = function (name) {
    return (this._properties[name] === undefined || this._properties[name].locked === false);
};

PropertyBuilder.prototype.setProperty = function (name, attributes) {
    if (this._canUpdateProperty(name)) {
        this._updatePropertyValue(name, attributes);
        Object.defineProperty(this._context, name, attributes);
    }
};

PropertyBuilder.prototype.addPropertyWithStartingValue = function (name, startingValue, canSet) {
    this.setProperty(name, {
        value: startingValue,
        writable: canSet,
        configurable: true
    });
};

PropertyBuilder.prototype.addProperty = function (name, canSet) {
    this.addPropertyWithStartingValue(name, null, canSet);
};

PropertyBuilder.prototype.lockProperty = function (name) {
    if (this._properties[name] !== undefined) {
        this.setProperty(name, { configurable: false});
    }
};

PropertyBuilder.prototype.makePropertyEnumerable = function (name) {
    this.setProperty(name, {enumerable: true, configurable: true});
};

PropertyBuilder.prototype.addGetterProperty = function (name, getter) {
    this.setProperty(name, {
        get: function () {
            var result = getter.call(this);
            return result === undefined ? this : result;
        },
        configurable: true
    });
};

PropertyBuilder.prototype.addSetterProperty = function (name, getter) {
    this.setProperty(name, {
        set: function () {
            var result = getter.call(this);
            return result === undefined ? this : result;
        },
        configurable: true
    });
};

PropertyBuilder.prototype.addGetterSetterProperty = function (name, getter, setter) {
    this.setProperty(name, {
        get: function () {
            return getter.call(this);
        },
        set: function (value) {
            setter.call(this, value);
        },
        configurable: true
    });
};

PropertyBuilder.prototype.makeAllUnlockedPropertiesEnumerable = function () {
    var prop;
    for (prop in this._properties) {
        if (this.hasOwnProperty(prop)) {
            this.makePropertyEnumerable(prop.name);
        }
    }
};

PropertyBuilder.prototype.lockAllProperties = function () {
    var prop;
    for (prop in this._properties) {
        if (this.hasOwnProperty(prop)) {
            this.lockProperty(prop.name);
        }
    }
};

var PropertyBuilderFactory = function () { return; };
PropertyBuilderFactory.prototype.createPropertyBuilder = function (context) { return new PropertyBuilder(context); };

module.exports.PropertyBuilderFactory = PropertyBuilderFactory;