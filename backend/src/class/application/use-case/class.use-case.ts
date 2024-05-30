import { Inject, Injectable } from '@nestjs/common';
import { IResponse } from 'src/common/domain/interface/response';

import { IClassModel } from 'src/common/domain/interface/class/model/class-model.interface';
import { OrmClassRepository } from 'src/common/domain/repositories/orm/class/orm-class.repository';

import { CreateClassDto } from 'src/class/domain/dto/create-class.dto';
import {
  IUseCaseClassService,
  IClassRepository,
} from 'src/class/domain/interfaces/class.interface';
import { IStudentRepository } from 'src/student/domain/interfaces/student.interface';
import { ITeacherRepository } from 'src/teacher/domain/interfaces/teacher.interface';
import { StudentRepository } from 'src/student/domain/repository/student.respository';
import { TeacherRepository } from 'src/teacher/domain/repository/teacher.respository';

@Injectable()
export class ClassUseCaseService implements IUseCaseClassService {
  constructor(
    @Inject(OrmClassRepository)
    private readonly classRepository: IClassRepository,

    @Inject(StudentRepository)
    private readonly studentRepository: IStudentRepository,

    @Inject(TeacherRepository)
    private readonly teacherRepository: ITeacherRepository,
  ) {}

  async getAllClasses(): Promise<IClassModel[]> {
    try {
      return await this.classRepository.getAllClasses();
    } catch (error) {
      throw error;
    }
  }
  async getClass(id: number): Promise<IClassModel> {
    return await this.classRepository.getClass(id);
  }

  async createClass(classrom: CreateClassDto): Promise<IResponse> {
    try {
      await this.classRepository.createClass(classrom);
      return {
        code: 200,
        message: 'success',
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
      };
    }
  }
  async updateClass(id: number, classrom: CreateClassDto): Promise<IResponse> {
    try {
      await this.classRepository.updateClass(id, classrom);
      return {
        code: 200,
        message: 'success',
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
      };
    }
  }
  async deleteClass(id: number): Promise<IResponse> {
    try {
      await this.classRepository.deleteClass(id);
      return {
        code: 200,
        message: 'success',
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
      };
    }
  }

  async addStudents(id: number, studentsId: number[]): Promise<IResponse> {
    try {
      const students = await Promise.all(
        studentsId.map(async (studentId) => {
          return await this.studentRepository.getStudent(studentId);
        }),
      );

      await this.classRepository.addStudents(id, students);

      return {
        code: 200,
        message: 'success',
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
      };
    }
  }
  async addTeacher(id: number, teacherId: number): Promise<IResponse> {
    try {
      console.log(teacherId);

      const dbTeacher = await this.teacherRepository.getTeacher(teacherId);

      if (!dbTeacher) {
        return {
          code: 400,
          message: 'teacher not found',
        };
      }

      await this.classRepository.addTeacher(id, dbTeacher);
      return {
        code: 200,
        message: 'success',
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
      };
    }
  }
}
