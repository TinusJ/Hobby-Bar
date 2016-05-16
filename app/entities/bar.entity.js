"use strict";
var BarEntity = (function () {
    function BarEntity() {
    }
    BarEntity.prototype.getBarName = function () {
        return this._barName;
    };
    BarEntity.prototype.getBarDescription = function () {
        return this._barDescription;
    };
    BarEntity.prototype.getBarId = function () {
        return this._barId;
    };
    BarEntity.prototype.getBarTime = function () {
        return this._openTime + '-' + this._closeTime;
    };
    BarEntity.prototype.getBarLocation = function () {
        return this._barLocation;
    };
    return BarEntity;
}());
exports.BarEntity = BarEntity;
//# sourceMappingURL=bar.entity.js.map