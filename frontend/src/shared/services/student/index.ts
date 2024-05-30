import {
  IGetStudentResponse,
  IUpdateStudentResponse,
  ListStudentsResponse,
} from '@/shared/common/interfaces';
import { thApi } from '../../common/api';

import { CreateStudent } from './model';

const studentServices = {
  getStudent: async (id: string) => {
    try {
      const req = await thApi.get<IGetStudentResponse>(`/student/${id}`);
      const student = req.data;
      return student;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  },
  listStudents: async () => {
    try {
      const req = await thApi.get<ListStudentsResponse>(`/student`);
      const students = req.data.data;
      return students;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  },
  createStudent: async (data: CreateStudent) => {
    try {
      const req = await thApi.post(`/student`, data);
      const Student = req.data;
      return Student;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  },
  editStudent: async (id: string, data: CreateStudent) => {
    try {
      const req = await thApi.put<IUpdateStudentResponse>(
        `/student/${id}`,
        data,
      );
      const Student = req.data;
      return Student;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  },
  deleteStudent: async (id: string) => {
    try {
      await thApi.delete(`/student/${id}`);
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  },
};

export default studentServices;
