import { useCallback, useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { QUERY_KEYS } from '@/shared/constants';
import { useGetTeacher } from '@/shared/hooks/react-query/teachers';
import { TeacherFromValues } from './model';
import TeacherServices from '@/shared/services/teacher';
import { Notify } from '@/shared/utils/notify';

const initialValues = {
  name: '',
  email: '',
  lastname: '',
};

export const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  lastname: Yup.string().required(),
});

export function useDefaultValues() {
  const params = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { teacher, isLoading } = useGetTeacher();

  const TeacherValues: TeacherFromValues = useMemo(
    () => ({
      name: teacher?.data.name || '',
      email: teacher?.data.email || '',
      lastname: teacher?.data.lastname || '',
    }),
    [teacher],
  );

  const update = useCallback(
    async (values: TeacherFromValues) => {
      try {
        const { data } = await TeacherServices.editTeacher(params.id || '', {
          ...values,
        });

        if (data.code !== 200) {
          throw new Error(data.message);
        }

        navigate(`/teachers`);
      } catch (error) {
        Notify(`opps!! algo no va bien ${error || ''}`, 'error');
      }
    },
    [params, navigate],
  );

  const create = useCallback(
    async (values: TeacherFromValues) => {
      try {
        const newCompany = await TeacherServices.createTeacher({
          ...values,
        });
        navigate(`/teachers`);
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
        queryClient.invalidateQueries([QUERY_KEYS.TEACHER]);
      },
    },
  );

  return {
    isLoading: isLoadingMutation || isLoading,
    submit: mutateAsync,
    formValues: {
      defaultValues: params.id ? TeacherValues : initialValues,
    },
    status: params.id ? 'Editar usuario' : 'Crear usuario',
    isEditing: !!params.id,
  };
}
