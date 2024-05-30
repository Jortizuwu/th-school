import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeacherController } from './infrastucture/teacher.controller';
import { TeacherEnity } from 'src/common/domain/entities/teacher.entity';
import { TeacherUseCaseService } from './application/use-case/teacher.use-case';
import { OrmTeacherRepository } from 'src/common/domain/repositories/orm/teacher/orm-teacher.repository';
import { TeacherRepository } from './domain/repository/teacher.respository';
@Module({
  imports: [TypeOrmModule.forFeature([TeacherEnity])],
  providers: [TeacherUseCaseService, OrmTeacherRepository, TeacherRepository],
  exports: [TeacherRepository],
  controllers: [TeacherController],
})
export class TeacherModule {}
