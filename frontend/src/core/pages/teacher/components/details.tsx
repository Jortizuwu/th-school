import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useGetTeacher } from '@/shared/hooks/react-query/teachers';
import { Box } from '@mui/material';

export default function TeacherDetailPage() {
  const { isLoading, teacher } = useGetTeacher();

  if (isLoading) return <>loading</>;

  return (
    <Container>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        mb={5}>
        <Typography variant='h4'>Teacher details</Typography>
      </Stack>
      <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>ID: </Typography>
        <Typography>{teacher?.data.id} </Typography>
      </Box>

      <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Name: </Typography>
        <Typography>{teacher?.data.name} </Typography>
      </Box>

      <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Lastname: </Typography>
        <Typography>{teacher?.data.lastname} </Typography>
      </Box>

      <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Email: </Typography>
        <Typography>{teacher?.data.email} </Typography>
      </Box>

      <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Createdate: </Typography>
        <Typography>{String(teacher?.data.createdate) ?? ''} </Typography>
      </Box>

      <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Updateddate: </Typography>
        <Typography>{String(teacher?.data.updateddate) ?? ''} </Typography>
      </Box>
    </Container>
  );
}
