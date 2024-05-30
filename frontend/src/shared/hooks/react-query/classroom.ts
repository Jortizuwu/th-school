import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { QUERY_KEYS } from '@/shared/constants';
import classRoomService from '@/shared/services/classroom';

/**
 * Retrieves a classroom by its ID using React Query.
 *
 * @return {Object} An object containing the classroom data and a loading indicator.
 */
export function useGetClassRoom() {
  const params = useParams();

  const { data: classRoom, isLoading } = useQuery(
    [QUERY_KEYS.CLASS, params.id],
    () => classRoomService.getClassRoom(params.id || ''),
  );
  return {
    classRoom: classRoom,
    isLoading,
  };
}

/**
 * Retrieves a list of classrooms using React Query.
 *
 * @return {Object} An object containing the list of classrooms and a loading indicator.
 */
export function useListClassRooms() {
  const { data: classRooms, isLoading } = useQuery([QUERY_KEYS.CLASS], () =>
    classRoomService.listClassRooms(),
  );
  return {
    classRooms,
    isLoading,
  };
}
