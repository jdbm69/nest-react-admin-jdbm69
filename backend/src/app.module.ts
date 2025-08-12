/**
 * Configuración dinámica de TypeORM usando forRootAsync.
 * La configuración antes ubicada en ormconfig se movió aquí,
 * eliminando el archivo ormconfig y centralizando la conexión en AppModule.
 * Lee datos de conexión desde variables de entorno, habilita autoLoadEntities
 * y agrega reintentos automáticos de conexión para mayor flexibilidad.
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { CourseModule } from './course/course.module';
import { StatsModule } from './stats/stats.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // Variables de entorno disponibles globalmente
    ConfigModule.forRoot({ isGlobal: true }),

    // Configuración de TypeORM leída desde ENV
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT ?? 5432),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,

        entities: [__dirname + '/**/*.entity{.js}'],

        synchronize: true,

        autoLoadEntities: true,

        // Reintentos para dar tiempo a la DB
        retryAttempts: 10,
        retryDelay: 5000,
      }),
    }),

    UserModule,
    AuthModule,
    CourseModule,
    ContentModule,
    StatsModule,
  ],
})

export class AppModule {}
