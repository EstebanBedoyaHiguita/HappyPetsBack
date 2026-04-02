"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingService = void 0;
const common_1 = require("@nestjs/common");
const shipping_rates_1 = require("./shipping-rates");
let ShippingService = class ShippingService {
    normalizeString(str) {
        return str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim();
    }
    findDepartmentRate(department) {
        const normalizedDepartment = this.normalizeString(department);
        return shipping_rates_1.SHIPPING_RATES.find((rate) => {
            const rateDepartment = this.normalizeString(rate.department);
            return (rateDepartment === normalizedDepartment ||
                rateDepartment.includes(normalizedDepartment) ||
                normalizedDepartment.includes(rateDepartment));
        });
    }
    calculateShipping(department, city, subtotal) {
        const departmentRate = this.findDepartmentRate(department);
        let shippingCost = shipping_rates_1.DEFAULT_SHIPPING_RATE;
        let zone = 3;
        if (departmentRate) {
            zone = departmentRate.zone;
            if (departmentRate.cities) {
                const normalizedCity = this.normalizeString(city);
                const cityRate = Object.entries(departmentRate.cities).find(([cityName]) => {
                    const normalizedCityName = this.normalizeString(cityName);
                    return (normalizedCityName === normalizedCity ||
                        normalizedCityName.includes(normalizedCity) ||
                        normalizedCity.includes(normalizedCityName));
                });
                if (cityRate) {
                    shippingCost = cityRate[1];
                }
                else {
                    shippingCost = departmentRate.defaultRate;
                }
            }
            else {
                shippingCost = departmentRate.defaultRate;
            }
        }
        const isFreeShipping = subtotal >= shipping_rates_1.FREE_SHIPPING_THRESHOLD;
        const finalShippingCost = isFreeShipping ? 0 : shippingCost;
        return {
            subtotal,
            shippingCost: finalShippingCost,
            isFreeShipping,
            total: subtotal + finalShippingCost,
            zone,
            department: departmentRate?.department || department,
            city,
        };
    }
    getShippingRates() {
        return {
            rates: shipping_rates_1.SHIPPING_RATES,
            freeShippingThreshold: shipping_rates_1.FREE_SHIPPING_THRESHOLD,
            defaultRate: shipping_rates_1.DEFAULT_SHIPPING_RATE,
        };
    }
    getDepartments() {
        return shipping_rates_1.SHIPPING_RATES.map((rate) => rate.department).sort();
    }
};
exports.ShippingService = ShippingService;
exports.ShippingService = ShippingService = __decorate([
    (0, common_1.Injectable)()
], ShippingService);
//# sourceMappingURL=shipping.service.js.map