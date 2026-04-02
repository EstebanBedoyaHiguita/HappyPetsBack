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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingController = void 0;
const common_1 = require("@nestjs/common");
const shipping_service_1 = require("./shipping.service");
let ShippingController = class ShippingController {
    shippingService;
    constructor(shippingService) {
        this.shippingService = shippingService;
    }
    calculateShipping(department, city, subtotal) {
        return this.shippingService.calculateShipping(department, city, parseFloat(subtotal) || 0);
    }
    getRates() {
        return this.shippingService.getShippingRates();
    }
    getDepartments() {
        return this.shippingService.getDepartments();
    }
};
exports.ShippingController = ShippingController;
__decorate([
    (0, common_1.Get)('calculate'),
    __param(0, (0, common_1.Query)('department')),
    __param(1, (0, common_1.Query)('city')),
    __param(2, (0, common_1.Query)('subtotal')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ShippingController.prototype, "calculateShipping", null);
__decorate([
    (0, common_1.Get)('rates'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShippingController.prototype, "getRates", null);
__decorate([
    (0, common_1.Get)('departments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShippingController.prototype, "getDepartments", null);
exports.ShippingController = ShippingController = __decorate([
    (0, common_1.Controller)('shipping'),
    __metadata("design:paramtypes", [shipping_service_1.ShippingService])
], ShippingController);
//# sourceMappingURL=shipping.controller.js.map