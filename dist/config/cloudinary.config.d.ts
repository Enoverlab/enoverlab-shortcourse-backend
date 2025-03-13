import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
export declare const CloudinaryConfig: {
    provide: string;
    useFactory: (configService: ConfigService) => typeof cloudinary;
    inject: (typeof ConfigService)[];
};
