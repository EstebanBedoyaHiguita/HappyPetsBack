"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const users_service_1 = require("../users/users.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const usersService = app.get(users_service_1.UsersService);
    const email = process.argv[2];
    const newPassword = process.argv[3];
    if (!email || !newPassword) {
        console.error('Uso: npx ts-node src/scripts/reset-password.ts email@ejemplo.com nuevaContraseña');
        process.exit(1);
    }
    const user = await usersService.findByEmail(email);
    if (!user) {
        console.error(`Usuario ${email} no encontrado`);
        process.exit(1);
    }
    await usersService.update(user._id.toString(), { password: newPassword });
    console.log(`Contraseña actualizada (con hash bcrypt) para ${email}`);
    await app.close();
}
bootstrap();
//# sourceMappingURL=reset-password.js.map