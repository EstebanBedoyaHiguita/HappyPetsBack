import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

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
