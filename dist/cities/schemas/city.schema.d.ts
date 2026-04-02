import { Document } from 'mongoose';
export type CityDocument = City & Document;
export declare enum ShippingZone {
    ZONE1 = "zone1",
    ZONE2 = "zone2"
}
export declare const SHIPPING_ZONE_PRICES: {
    zone1: number;
    zone2: number;
};
export declare class City {
    name: string;
    department: string;
    zone: ShippingZone;
    active: boolean;
}
export declare const CitySchema: import("mongoose").Schema<City, import("mongoose").Model<City, any, any, any, (Document<unknown, any, City, any, import("mongoose").DefaultSchemaOptions> & City & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, City, any, import("mongoose").DefaultSchemaOptions> & City & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, City>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, City, Document<unknown, {}, City, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<City & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, City, Document<unknown, {}, City, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<City & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    department?: import("mongoose").SchemaDefinitionProperty<string, City, Document<unknown, {}, City, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<City & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    zone?: import("mongoose").SchemaDefinitionProperty<ShippingZone, City, Document<unknown, {}, City, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<City & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    active?: import("mongoose").SchemaDefinitionProperty<boolean, City, Document<unknown, {}, City, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<City & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, City>;
