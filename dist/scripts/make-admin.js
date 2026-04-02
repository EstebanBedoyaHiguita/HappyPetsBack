"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const users_service_1 = require("../users/users.service");
const user_schema_1 = require("../users/schemas/user.schema");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const usersService = app.get(users_service_1.UsersService);
    const email = process.argv[2];
    if (!email) {
        console.error('Por favor proporciona un email: npx ts-node src/scripts/make-admin.ts email@example.com');
        process.exit(1);
    }
    try {
        const user = await usersService.findByEmail(email);
        if (!user) {
            console.error(`Usuario con email ${email} no encontrado`);
            process.exit(1);
        }
        await usersService.update(user._id.toString(), { role: user_schema_1.UserRole.ADMIN });
        console.log(`Usuario ${email} actualizado a rol ADMIN exitosamente`);
    }
    catch (error) {
        console.error('Error:', error.message);
    }
    await app.close();
}
bootstrap();
//# sourceMappingURL=make-admin.js.map