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
  /**
   * Constructs a new instance of the ClassUseCaseService class.
   *
   * @param {IClassRepository} classRepository - The class repository.
   * @param {IStudentRepository} studentRepository - The student repository.
   * @param {ITeacherRepository} teacherRepository - The teacher repository.
   */

  constructor(
    @Inject(OrmClassRepository)
    private readonly classRepository: IClassRepository,

    @Inject(StudentRepository)
    private readonly studentRepository: IStudentRepository,

    @Inject(TeacherRepository)
    private readonly teacherRepository: ITeacherRepository,
  ) {}

  /**
   * Retrieves all classes from the class repository.
   *
   * @return {Promise<IClassModel[]>} A promise that resolves to an array of class models.
   */
  async getAllClasses(): Promise<IClassModel[]> {
    try {
      return await this.classRepository.getAllClasses();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a class model from the class repository based on the provided ID.
   *
   * @param {number} id - The ID of the class to retrieve.
   * @return {Promise<IClassModel>} A promise that resolves to the class model.
   */
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

  /**
   * Updates a class with the given ID using the provided CreateClassDto.
   *
   * @param {number} id - The ID of the class to update.
   * @param {CreateClassDto} classrom - The data to update the class with.
   * @return {Promise<IResponse>} A promise that resolves to an IResponse object with the code and message properties.
   */
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

  /**
   * Deletes a class with the given ID.
   *
   * @param {number} id - The ID of the class to delete.
   * @return {Promise<IResponse>} A promise that resolves to an IResponse object with the code and message properties.
   *                              If the deletion is successful, the code will be 200 and the message will be 'success'.
   *                              If there is an error, the code will be 400 and the message will be the error message.
   */
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

  /**
   * Adds students to a class with the given ID.
   *
   * @param {number} id - The ID of the class to add students to.
   * @param {number[]} studentsId - An array of student IDs to add to the class.
   * @return {Promise<IResponse>} A promise that resolves to an IResponse object with the code and message properties.
   *                              If the addition is successful, the code will be 200 and the message will be 'success'.
   *                              If there is an error, the code will be 400 and the message will be the error message.
   */
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

  /**
   * Adds a teacher to a class with the given ID.
   *
   * @param {number} id - The ID of the class to add the teacher to.
   * @param {number} teacherId - The ID of the teacher to add.
   * @return {Promise<IResponse>} A promise that resolves to an IResponse object with the code and message properties.
   *                              If the addition is successful, the code will be 200 and the message will be 'success'.
   *                              If the teacher is not found, the code will be 400 and the message will be 'teacher not found'.
   *                              If there is an error, the code will be 400 and the message will be the error message.
   */
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
