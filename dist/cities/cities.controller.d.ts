import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
export declare class CitiesController {
    private readonly citiesService;
    constructor(citiesService: CitiesService);
    create(createCityDto: CreateCityDto): Promise<import("./schemas/city.schema").City>;
    findAll(active?: string): Promise<import("./schemas/city.schema").City[]>;
    getDepartments(): Promise<string[]>;
    getZonePrices(): {
        zone1: number;
        zone2: number;
    };
    findByDepartment(department: string): Promise<import("./schemas/city.schema").City[]>;
    findOne(id: string): Promise<import("./schemas/city.schema").City>;
    getShippingCost(id: string): Promise<number>;
    update(id: string, updateCityDto: UpdateCityDto): Promise<import("./schemas/city.schema").City>;
    remove(id: string): Promise<void>;
}
