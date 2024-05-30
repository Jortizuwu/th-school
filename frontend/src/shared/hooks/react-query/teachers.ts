import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { QUERY_KEYS } from '@/shared/constants';
import teacherService from '@/shared/services/teacher';

export function useGetTeacher() {
  const params = useParams();

  const { data: teacher, isLoading } = useQuery(
    [QUERY_KEYS.TEACHER, params.id],
    () => teacherService.getTeacher(params.id || ''),
  );
  return {
    teacher: teacher,
    isLoading,
  };
}

export function useListTeachers() {
  const { data: teachers, isLoading } = useQuery([QUERY_KEYS.TEACHER], () =>
    teacherService.listTeachers(),
  );
  return {
    teachers,
    isLoading,
  };
}
