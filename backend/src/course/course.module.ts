/**
 * Integración con TypeORM para la entidad Course.
 * Ahora se puede inyectar su repositorio en CourseService
 * y exportarlo a otros módulos mediante TypeOrmModule.forFeature([Course]).
 * Se mantiene forwardRef para evitar dependencias circulares con ContentModule.
 */

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { ContentModule } from 'src/content/content.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    forwardRef(() => ContentModule),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService, TypeOrmModule],
})
export class CourseModule {}
