"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, transformOptions: {
            enableImplicitConversion: true,
        }, }));
    app.enableCors({ origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173', 'https://enoverlab-shortcourse-fe.vercel.app', 'https://enoverlab-shortcourse-fe-git-development-enoverlabs-projects.vercel.app'], credentials: true });
    app.use(cookieParser(process.env.COOKIE_SECRET));
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map