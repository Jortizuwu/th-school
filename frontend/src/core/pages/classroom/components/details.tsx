import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useGetClassRoom } from '@/shared/hooks/react-query/classroom';
import { Box, Card, TableCell, TableRow } from '@mui/material';
import TableComponent from '@/shared/components/table';

export default function ClassRoomDetailPage() {
  const { isLoading, classRoom } = useGetClassRoom();

  if (isLoading) return <>loading</>;

  return (
    <Container>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        mb={5}>
        <Typography variant='h4'>ClassRoom details</Typography>
      </Stack>
      <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>ID: </Typography>
        <Typography>{classRoom?.data.id} </Typography>
      </Box>

      <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Name: </Typography>
        <Typography>{classRoom?.data.name} </Typography>
      </Box>

      <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Lastname: </Typography>
        <Typography>{classRoom?.data.description} </Typography>
      </Box>

      <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Createdate: </Typography>
        <Typography>{String(classRoom?.data.createdate) ?? ''} </Typography>
      </Box>

      <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Updateddate: </Typography>
        <Typography>{String(classRoom?.data.updateddate) ?? ''} </Typography>
      </Box>

      <Card sx={{ display: 'flex', flexDirection: 'column', padding: 3 }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '20px',
            mb: 2,
          }}>
          Teacher
        </Typography>
        <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>ID: </Typography>
          <Typography>{classRoom?.data.teacher?.id} </Typography>
        </Box>

        <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>Name: </Typography>
          <Typography>{classRoom?.data.teacher?.name} </Typography>
        </Box>
      </Card>
      <Card
        sx={{ display: 'flex', flexDirection: 'column', padding: 3, mt: 3 }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '20px',
            mb: 2,
          }}>
          Students: {classRoom?.data.students?.length}
        </Typography>
        <TableComponent
          headLabel={[
            { id: 'id', label: 'id' },
            { id: 'name', label: 'name' },
            { id: 'lastname', label: 'lastname' },
          ]}>
          {classRoom?.data.students?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.lastname}</TableCell>
            </TableRow>
          ))}
        </TableComponent>
      </Card>
    </Container>
  );
}
