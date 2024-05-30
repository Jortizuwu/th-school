import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Iconify from '@/shared/components/iconify';
import { useListClassRooms } from '@/shared/hooks/react-query/classroom';
import { Link } from 'react-router-dom';
import TableComponent from '@/shared/components/table';
import ClassRoomTableRow from './table-row';

export default function ClassRoomPage() {
  const { isLoading, classRooms } = useListClassRooms();

  if (isLoading) return <>loading</>;

  return (
    <Container>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        mb={5}>
        <Typography variant='h4'>ClassRooms</Typography>

        <Link to='/classroom/create'>
          <Button
            variant='contained'
            color='inherit'
            startIcon={<Iconify icon='eva:plus-fill' />}>
            New ClassRoom
          </Button>
        </Link>
      </Stack>
      <TableComponent
        headLabel={[
          { id: 'id', label: 'id' },
          { id: 'name', label: 'name' },
          { id: 'description', label: 'description' },
          { id: 'createdate', label: 'create date' },
          { id: 'updateddate', label: 'updateddate' },
          { id: 'action', label: 'actions' },
        ]}>
        {classRooms?.map((row) => (
          <ClassRoomTableRow
            key={row.id}
            id={row.id}
            name={row.name}
            description={row.description}
            createdAt={String(row.createdate)}
            updatedAt={String(row.updateddate)}
          />
        ))}
      </TableComponent>
    </Container>
  );
}
