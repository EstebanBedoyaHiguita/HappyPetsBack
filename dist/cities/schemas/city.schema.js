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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitySchema = exports.City = exports.SHIPPING_ZONE_PRICES = exports.ShippingZone = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var ShippingZone;
(function (ShippingZone) {
    ShippingZone["ZONE1"] = "zone1";
    ShippingZone["ZONE2"] = "zone2";
})(ShippingZone || (exports.ShippingZone = ShippingZone = {}));
exports.SHIPPING_ZONE_PRICES = {
    [ShippingZone.ZONE1]: 10000,
    [ShippingZone.ZONE2]: 15000,
};
let City = class City {
    name;
    department;
    zone;
    active;
};
exports.City = City;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], City.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], City.prototype, "department", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ShippingZone, default: ShippingZone.ZONE2 }),
    __metadata("design:type", String)
], City.prototype, "zone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], City.prototype, "active", void 0);
exports.City = City = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], City);
exports.CitySchema = mongoose_1.SchemaFactory.createForClass(City);
exports.CitySchema.index({ name: 1, department: 1 }, { unique: true });
//# sourceMappingURL=city.schema.js.map