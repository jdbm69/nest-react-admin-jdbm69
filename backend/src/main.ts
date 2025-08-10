import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { Role } from './enums/role.enum';
import { User } from './user/user.entity'; 
import { getConnection } from 'typeorm';

async function createAdminOnFirstUse() {
  const connection = getConnection(); 
  const userRepo = connection.getRepository(User);

  const admin = await userRepo.findOne({ where: { username: 'admin' } });
  if (!admin) {
    const hashed = await bcrypt.hash('admin123', 10);
    const newAdmin = userRepo.create({
      firstName: 'admin',
      lastName: 'admin',
      isActive: true,
      username: 'admin',
      role: Role.Admin,
      password: hashed,
    });
    await userRepo.save(newAdmin);
    console.log('✔ Admin seed creado');
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Carna Project API')
    .setDescription('Carna Project API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  // Esperar a que los módulos y la conexión estén listos
  await app.init();

  await createAdminOnFirstUse();

  await app.listen(5000);
  console.log('API listening on :5000');
}
bootstrap();
