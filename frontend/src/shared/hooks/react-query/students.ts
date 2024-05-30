import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { QUERY_KEYS } from '@/shared/constants';
import studentService from '@/shared/services/student';

export function useGetStudent() {
  const params = useParams();

  const { data: student, isLoading } = useQuery(
    [QUERY_KEYS.STUDENT, params.id],
    () => studentService.getStudent(params.id || ''),
  );
  return {
    student: student,
    isLoading,
  };
}

export function useListStudents() {
  const { data: students, isLoading } = useQuery([QUERY_KEYS.STUDENT], () =>
    studentService.listStudents(),
  );
  return {
    students,
    isLoading,
  };
}
