/**
 * Actualización en main.ts para mejorar el manejo de la conexión y el repositorio usando TypeORM.
 * Se reemplaza el acceso directo al Entity con consultas a través del repositorio obtenido
 * con getConnection(). Esto mejora la compatibilidad con futuras versiones y permite un mejor control.
 * 
 * Se agrega un console.log para confirmar creación del admin en la primera ejecución.
 * También se espera explícitamente a que la app esté inicializada (await app.init()) antes
 * de intentar crear el admin, asegurando que la conexión a la base de datos esté lista.
 * 
 * Se mantiene la configuración Swagger y middleware igual, con mejoras en mensajes de log.
 */

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

  // Espera a que los módulos y la conexión estén listos
  await app.init();

  await createAdminOnFirstUse();

  await app.listen(5000);
  console.log('API listening on :5000');
}
bootstrap();
