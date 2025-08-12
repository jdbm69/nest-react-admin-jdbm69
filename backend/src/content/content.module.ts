/**
 * Integración con TypeORM para la entidad Content.
 * Ahora se puede inyectar su repositorio en ContentService
 * y exportarlo a otros módulos mediante TypeOrmModule.forFeature([Content]).
 * Se mantiene forwardRef para evitar dependencias circulares con CourseModule.
 */

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContentService } from './content.service';
import { Content } from './content.entity';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content]),
    forwardRef(() => CourseModule),
  ],
  controllers: [],
  providers: [ContentService],
  exports: [ContentService, TypeOrmModule],
})
export class ContentModule {}
