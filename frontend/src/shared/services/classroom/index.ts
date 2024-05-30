import {
  IGetClassRoomResponse,
  IUpdateClassRoomResponse,
  ListClassRoomsResponse,
} from '@/shared/common/interfaces';
import { thApi } from '../../common/api';

import { CreateClassRoom, UpdateClassRoomAdd } from './model';

const ClassRoomServices = {
  /**
   * Retrieves a classroom by its ID.
   *
   * @param {string} id - The ID of the classroom to retrieve.
   * @return {Promise<IGetClassRoomResponse>} A promise that resolves to the retrieved classroom.
   * @throws {Error} If an error occurs while retrieving the classroom.
   */
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

  /**
   * Retrieves a list of classrooms.
   *
   * @return {Promise<ListClassRoomsResponse>} A promise that resolves to the list of classrooms.
   * @throws {Error} If an error occurs while retrieving the classrooms.
   */
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

  /**
   * Creates a new classroom with the given data.
   *
   * @param {CreateClassRoom} data - The data for creating the classroom.
   * @return {Promise<IGetClassRoomResponse>} A promise that resolves to the created classroom.
   * @throws {Error} If an error occurs while creating the classroom.
   */
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

  /**
   * Edits a classroom with the given ID using the provided data.
   *
   * @param {string} id - The ID of the classroom to edit.
   * @param {UpdateClassRoomAdd} data - The data to update the classroom with.
   * @return {Promise<IUpdateClassRoomResponse>} A promise that resolves to the updated classroom.
   * @throws {Error} If an error occurs while editing the classroom.
   */
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

  /**
   * Deletes a classroom with the given ID.
   *
   * @param {string} id - The ID of the classroom to delete.
   * @return {Promise<void>} - A promise that resolves when the classroom is successfully deleted.
   * @throws {Error} - If an error occurs while deleting the classroom.
   */
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
