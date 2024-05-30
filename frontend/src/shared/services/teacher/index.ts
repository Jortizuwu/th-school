import {
  IGetTeacherResponse,
  IUpdateTeacherResponse,
  ListTeachersResponse,
} from '@/shared/common/interfaces';
import { thApi } from '../../common/api';

import { CreateTeacher } from './model';

const teacherServices = {
  getTeacher: async (id: string) => {
    try {
      const req = await thApi.get<IGetTeacherResponse>(`/teacher/${id}`);
      const teacher = req.data;
      return teacher;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  },
  listTeachers: async () => {
    try {
      const req = await thApi.get<ListTeachersResponse>(`/teacher`);
      const Teachers = req.data.data;
      return Teachers;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  },
  createTeacher: async (data: CreateTeacher) => {
    try {
      const req = await thApi.post(`/teacher`, data);
      const teacher = req.data;
      return teacher;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  },
  editTeacher: async (id: string, data: CreateTeacher) => {
    try {
      const req = await thApi.put<IUpdateTeacherResponse>(
        `/teacher/${id}`,
        data,
      );
      const teacher = req.data;
      return teacher;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  },
  deleteTeacher: async (id: string) => {
    try {
      await thApi.delete(`/teacher/${id}`);
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  },
};

export default teacherServices;
