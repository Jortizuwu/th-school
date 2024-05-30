import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { QUERY_KEYS } from '@/shared/constants';
import classRoomService from '@/shared/services/classroom';

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

export function useListClassRooms() {
  const { data: classRooms, isLoading } = useQuery([QUERY_KEYS.CLASS], () =>
    classRoomService.listClassRooms(),
  );
  return {
    classRooms,
    isLoading,
  };
}
