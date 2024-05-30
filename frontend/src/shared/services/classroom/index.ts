import {
  IGetClassRoomResponse,
  IUpdateClassRoomResponse,
  ListClassRoomsResponse,
} from '@/shared/common/interfaces';
import { thApi } from '../../common/api';

import { CreateClassRoom, UpdateClassRoomAdd } from './model';

const ClassRoomServices = {
  getClassRoom: async (id: string) => {
    try {
      const req = await thApi.get<IGetClassRoomResponse>(`/class/${id}`);
      const classRoom = req.data;
      return classRoom;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  },
  listClassRooms: async () => {
    try {
      const req = await thApi.get<ListClassRoomsResponse>(`/class`);
      const ClassRooms = req.data.data;
      return ClassRooms;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  },
  createClassRoom: async (data: CreateClassRoom) => {
    try {
      const req = await thApi.post(`/class`, {
        name: data.name,
        description: data.description,
      });
      const classRoom = req.data;
      return classRoom;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  },
  editClassRoom: async (id: string, data: UpdateClassRoomAdd) => {
    try {
      const { studentsId, teacherId, ...rest } = data;
      const req = await thApi.put<IUpdateClassRoomResponse>(
        `/class/${id}`,
        rest,
      );

      if (studentsId.length > 0) {
        await thApi.post<IUpdateClassRoomResponse>(
          `/class/${id}/assign-students`,
          {
            studentsId: studentsId.map((val) => Number(val)),
          },
        );
      }

      if (teacherId.length > 0) {
        await thApi.post<IUpdateClassRoomResponse>(
          `/class/${id}/assign-teacher`,
          {
            teacherId: Number(teacherId),
          },
        );
      }
      const classRoom = req.data;
      return classRoom;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  },
  deleteClassRoom: async (id: string) => {
    try {
      await thApi.delete(`/class/${id}`);
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  },
};

export default ClassRoomServices;
