/**
 * Integración con TypeORM para la entidad User.
 * Ahora se puede inyectar su repositorio en el servicio
 * y exportarlo a otros módulos mediante TypeOrmModule.forFeature([User]).
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], 
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule], 
})
export class UserModule {}
