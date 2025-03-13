"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryConfig = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = require("@nestjs/config");
exports.CloudinaryConfig = {
    provide: 'CLOUDINARY',
    useFactory: (configService) => {
        cloudinary_1.v2.config({
            cloud_name: configService.get('CLOUDI_NAME'),
            api_key: configService.get('CLOUDI_API_KEY'),
            api_secret: configService.get('CLOUDI_API_SECRET'),
        });
        return cloudinary_1.v2;
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=cloudinary.config.js.map