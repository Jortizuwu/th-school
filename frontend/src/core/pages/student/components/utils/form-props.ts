import { useCallback, useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { QUERY_KEYS } from '@/shared/constants';
import { useGetStudent } from '@/shared/hooks/react-query/students';
import { StudentFromValues } from './model';
import studentServices from '@/shared/services/student';
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

  const { student, isLoading } = useGetStudent();

  const stutudentValues: StudentFromValues = useMemo(
    () => ({
      name: student?.data.name || '',
      email: student?.data.email || '',
      lastname: student?.data.lastname || '',
    }),
    [student],
  );

  const update = useCallback(
    async (values: StudentFromValues) => {
      try {
        const { data } = await studentServices.editStudent(params.id || '', {
          ...values,
        });

        if (data.code !== 200) {
          throw new Error(data.message);
        }

        navigate(`/students`);
      } catch (error) {
        Notify(`opps!! algo no va bien ${error || ''}`, 'error');
      }
    },
    [params, navigate],
  );

  const create = useCallback(
    async (values: StudentFromValues) => {
      try {
        const newCompany = await studentServices.createStudent({
          ...values,
        });
        navigate(`/students`);
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
        queryClient.invalidateQueries([QUERY_KEYS.STUDENT]);
      },
    },
  );

  return {
    isLoading: isLoadingMutation || isLoading,
    submit: mutateAsync,
    formValues: {
      defaultValues: params.id ? stutudentValues : initialValues,
    },
    status: params.id ? 'Editar usuario' : 'Crear usuario',
    isEditing: !!params.id,
  };
}
