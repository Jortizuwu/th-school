import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Iconify from '@/shared/components/iconify';
import { useListStudents } from '@/shared/hooks/react-query/students';
import { Link } from 'react-router-dom';
import TableComponent from '@/shared/components/table';
import StudentTableRow from './table-row';

export default function StudentPage() {
  const { isLoading, students } = useListStudents();

  if (isLoading) return <>loading</>;

  return (
    <Container>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        mb={5}>
        <Typography variant='h4'>Students</Typography>

        <Link to='/students/create'>
          <Button
            variant='contained'
            color='inherit'
            startIcon={<Iconify icon='eva:plus-fill' />}>
            New Student
          </Button>
        </Link>
      </Stack>
      <TableComponent
        headLabel={[
          { id: 'id', label: 'id' },
          { id: 'name', label: 'name' },
          { id: 'lastname', label: 'lastname' },
          { id: 'email', label: 'email' },
          { id: 'createdate', label: 'create date' },
          { id: 'updateddate', label: 'updateddate' },
          { id: 'action', label: 'actions' },
        ]}>
        {students?.map((row) => (
          <StudentTableRow
            key={row.id}
            id={row.id}
            name={row.name}
            lastname={row.lastname}
            email={row.email}
            createdAt={String(row.createdate)}
            updatedAt={String(row.updateddate)}
          />
        ))}
      </TableComponent>
    </Container>
  );
}
