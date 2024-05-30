import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentController } from './infrastucture/student.controller';
import { StudentEnity } from 'src/common/domain/entities/student.entity';
import { StudentUseCaseService } from './application/use-case/student.use-case';
import { OrmStudentRepository } from 'src/common/domain/repositories/orm/student/orm-student.repository';
import { StudentRepository } from './domain/repository/student.respository';
@Module({
  imports: [TypeOrmModule.forFeature([StudentEnity])],
  providers: [StudentUseCaseService, OrmStudentRepository, StudentRepository],
  exports: [StudentRepository],
  controllers: [StudentController],
})
export class StudentModule {}
