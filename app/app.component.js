"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var bar_service_1 = require('./services/bar.service');
var http_1 = require('@angular/http');
var bar_entity_1 = require('./entities/bar.entity');
var AppComponent = (function () {
    function AppComponent(_barService) {
        this._barService = _barService;
    }
    AppComponent.prototype.doSearch = function () {
        var _this = this;
        if (this._search != null && this._search.length > 0) {
            this._barService.getAllBars().subscribe(function (bars) { return _this.getSearch(bars); }, function (error) { return _this.errorMessage = error; });
        }
    };
    AppComponent.prototype.getSearch = function (tmpBars) {
        var list = bar_entity_1.BarEntity[];
        for (var i = 0; i < tmpBars.length; i++) {
            var tmp = tmpBars[i];
            if (tmp.BarName.toLowerCase().indexOf(this._search.toLowerCase()) > -1) {
                //  console.log(tmp);
                list.push(tmp);
            }
        }
        this.bars = list;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "<div>\n                  <form name=\"searchForm\">\n                      <input [(ngModel)]=\"_search\" placeholder=\"Search\"/>\n                      <button (click)=\"doSearch()\"> Search </button>\n                  </form>\n              </div>\n              \n              <ul>\n                    <li  *ngFor=\"let bar of bars\">{{bar.BarName}}</li>\n              </ul>\n              \n              \n              ",
            providers: [bar_service_1.BarService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [bar_service_1.BarService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map