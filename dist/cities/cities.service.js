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
exports.CitiesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const city_schema_1 = require("./schemas/city.schema");
let CitiesService = class CitiesService {
    cityModel;
    constructor(cityModel) {
        this.cityModel = cityModel;
    }
    async create(createCityDto) {
        try {
            const city = new this.cityModel(createCityDto);
            return await city.save();
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('Esta ciudad ya existe en este departamento');
            }
            throw error;
        }
    }
    async findAll(activeOnly = false) {
        const filter = activeOnly ? { active: true } : {};
        return this.cityModel.find(filter).sort({ department: 1, name: 1 }).exec();
    }
    async findByDepartment(department) {
        return this.cityModel
            .find({ department: new RegExp(department, 'i'), active: true })
            .sort({ name: 1 })
            .exec();
    }
    async findOne(id) {
        const city = await this.cityModel.findById(id).exec();
        if (!city) {
            throw new common_1.NotFoundException('Ciudad no encontrada');
        }
        return city;
    }
    async update(id, updateCityDto) {
        const city = await this.cityModel
            .findByIdAndUpdate(id, updateCityDto, { new: true })
            .exec();
        if (!city) {
            throw new common_1.NotFoundException('Ciudad no encontrada');
        }
        return city;
    }
    async remove(id) {
        const result = await this.cityModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('Ciudad no encontrada');
        }
    }
    async getDepartments() {
        const departments = await this.cityModel.distinct('department', { active: true }).exec();
        return departments.sort();
    }
    async getShippingCost(cityId) {
        const city = await this.findOne(cityId);
        return city_schema_1.SHIPPING_ZONE_PRICES[city.zone];
    }
    getZonePrices() {
        return city_schema_1.SHIPPING_ZONE_PRICES;
    }
};
exports.CitiesService = CitiesService;
exports.CitiesService = CitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(city_schema_1.City.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CitiesService);
//# sourceMappingURL=cities.service.js.map