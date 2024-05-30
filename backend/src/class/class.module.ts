import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClassController } from './infrastucture/class.controller';
import { ClassEnity } from 'src/common/domain/entities/class.entity';
import { ClassUseCaseService } from './application/use-case/class.use-case';
import { OrmClassRepository } from 'src/common/domain/repositories/orm/class/orm-class.repository';
import { ClassRepository } from './domain/repository/class.respository';
import { StudentModule } from 'src/student/student.module';
import { TeacherModule } from 'src/teacher/teacher.module';

/**
 * The ClassModule class is a NestJS module that defines the configuration for the class module.
 * It is decorated with the @Module decorator, which indicates that it is a module in the NestJS application.
 *
 * The imports array specifies the modules that this module depends on. It includes the TypeOrmModule for the class entity, StudentModule, and TeacherModule.
 **/

@Module({
  imports: [
    TypeOrmModule.forFeature([ClassEnity]),
    StudentModule,
    TeacherModule,
  ],
  providers: [ClassUseCaseService, OrmClassRepository, ClassRepository],
  exports: [ClassRepository],
  controllers: [ClassController],
})
export class ClassModule {}
