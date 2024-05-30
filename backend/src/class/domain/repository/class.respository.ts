import { Inject, Injectable } from '@nestjs/common';

import { IClassModel } from 'src/common/domain/interface/class/model/class-model.interface';
import { OrmClassRepository } from 'src/common/domain/repositories/orm/class/orm-class.repository';

import { IOrmClassRepository } from 'src/common/domain/interface/class/repository.interface';
import { IClassRepository } from '../interfaces/class.interface';
import { ICreateClassDto } from 'src/common/domain/interface/class/dto/create-class-dto.interface';
import { IStudentModel } from 'src/common/domain/interface/student/model/student-model.interface';
import { ITeacherModel } from 'src/common/domain/interface/teacher/model/teacher-model.interface';

/**
 *  ClassRepository is a class that implements the IClassRepository interface.
 *
 * @class ClassRepository
 * @classdesc ClassRepository is a class that implements the IClassRepository interface.
 *
 */

@Injectable()
export class ClassRepository implements IOrmClassRepository {
  constructor(
    @Inject(OrmClassRepository)
    private readonly classRepository: IClassRepository,
  ) {}

  async getAllClasses(): Promise<IClassModel[]> {
    return await this.classRepository.getAllClasses();
  }
  async getClass(id: number): Promise<IClassModel> {
    return await this.classRepository.getClass(id);
  }

  async createClass(classrom: ICreateClassDto): Promise<void> {
    await this.classRepository.createClass(classrom);
  }

  async updateClass(id: number, classrom: ICreateClassDto): Promise<void> {
    await this.classRepository.updateClass(id, classrom);
  }
  async deleteClass(id: number): Promise<void> {
    await this.classRepository.deleteClass(id);
  }

  async addStudents(id: number, studentsId: IStudentModel[]): Promise<void> {
    await this.classRepository.addStudents(id, studentsId);
  }
  async addTeacher(id: number, teacher: ITeacherModel): Promise<void> {
    await this.classRepository.addTeacher(id, teacher);
  }
}
