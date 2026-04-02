import { ConfigService } from '@nestjs/config';
export declare class UploadService {
    private configService;
    constructor(configService: ConfigService);
    uploadImage(file: Express.Multer.File, folder?: string): Promise<string>;
    deleteImage(publicId: string): Promise<void>;
}
