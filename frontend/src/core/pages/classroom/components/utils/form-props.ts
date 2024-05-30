import { useCallback, useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { QUERY_KEYS } from '@/shared/constants';
import { useGetClassRoom } from '@/shared/hooks/react-query/classroom';
import { ClassRoomFromValues } from './model';
import ClassRoomServices from '@/shared/services/classroom';
import { Notify } from '@/shared/utils/notify';

const initialValues = {
  name: '',
  description: '',
  teacherId: '',
  studentsId: [],
};

export const schema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  teacherId: Yup.string(),
  studentsId: Yup.array(),
});

export function useDefaultValues() {
  const params = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { classRoom, isLoading } = useGetClassRoom();

  const classRoomValues: ClassRoomFromValues = useMemo(
    () => ({
      name: classRoom?.data.name || '',
      description: classRoom?.data.description || '',
      studentsId: classRoom?.data.students.map((val) => String(val.id)),
      teacherId: String(classRoom?.data.teacher?.id),
    }),
    [classRoom],
  );

  const update = useCallback(
    async (values: ClassRoomFromValues) => {
      try {
        const { data } = await ClassRoomServices.editClassRoom(
          params.id || '',
          {
            ...values,
            studentsId: values.studentsId ?? [],
            teacherId: values.teacherId ?? '',
          },
        );

        if (data.code !== 200) {
          throw new Error(data.message);
        }

        navigate(`/classroom`);
      } catch (error) {
        Notify(`opps!! algo no va bien ${error || ''}`, 'error');
      }
    },
    [params, navigate],
  );

  const create = useCallback(
    async (values: ClassRoomFromValues) => {
      try {
        const newCompany = await ClassRoomServices.createClassRoom({
          ...values,
        });
        navigate(`/classroom`);
        return newCompany;
      } catch (error) {
        Notify(`opps!! algo no va bien ${error || ''}`, 'error');
      }
    },
    [navigate],
  );

  const { mutateAsync, isLoading: isLoadingMutation } = useMutation(
    params.id ? update : create,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS.CLASS]);
      },
    },
  );

  return {
    isLoading: isLoadingMutation || isLoading,
    submit: mutateAsync,
    formValues: {
      defaultValues: params.id ? classRoomValues : initialValues,
    },
    status: params.id ? 'Update classroom' : 'Create classroom',
    isEditing: !!params.id,
  };
}
