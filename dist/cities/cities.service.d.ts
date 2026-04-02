import { Model } from 'mongoose';
import { City, CityDocument } from './schemas/city.schema';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
export declare class CitiesService {
    private cityModel;
    constructor(cityModel: Model<CityDocument>);
    create(createCityDto: CreateCityDto): Promise<City>;
    findAll(activeOnly?: boolean): Promise<City[]>;
    findByDepartment(department: string): Promise<City[]>;
    findOne(id: string): Promise<City>;
    update(id: string, updateCityDto: UpdateCityDto): Promise<City>;
    remove(id: string): Promise<void>;
    getDepartments(): Promise<string[]>;
    getShippingCost(cityId: string): Promise<number>;
    getZonePrices(): {
        zone1: number;
        zone2: number;
    };
}
