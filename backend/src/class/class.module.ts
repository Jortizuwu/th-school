import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClassController } from './infrastucture/class.controller';
import { ClassEnity } from 'src/common/domain/entities/class.entity';
import { ClassUseCaseService } from './application/use-case/class.use-case';
import { OrmClassRepository } from 'src/common/domain/repositories/orm/class/orm-class.repository';
import { ClassRepository } from './domain/repository/class.respository';
import { StudentModule } from 'src/student/student.module';
import { TeacherModule } from 'src/teacher/teacher.module';
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
