"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const users_service_1 = require("./users/users.service");
const user_schema_1 = require("./users/schemas/user.schema");
async function seed() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const usersService = app.get(users_service_1.UsersService);
    try {
        const existingAdmin = await usersService.findByEmail('admin@happypets.co');
        if (existingAdmin) {
            console.log('Admin user already exists');
        }
        else {
            await usersService.create({
                name: 'Administrador',
                email: 'admin@happypets.co',
                password: 'admin123',
                role: user_schema_1.UserRole.ADMIN,
            });
            console.log('Admin user created successfully');
            console.log('Email: admin@happypets.co');
            console.log('Password: admin123');
        }
    }
    catch (error) {
        console.error('Error seeding database:', error);
    }
    await app.close();
}
seed();
//# sourceMappingURL=seed.js.map