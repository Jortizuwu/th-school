import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useGetStudent } from '@/shared/hooks/react-query/students';
import { Box } from '@mui/material';

export default function StudentDetailPage() {
  const { isLoading, student } = useGetStudent();

  if (isLoading) return <>loading</>;

  return (
    <Container>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        mb={5}>
        <Typography variant='h4'>Student details</Typography>
      </Stack>
      <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>ID: </Typography>
        <Typography>{student?.data.id} </Typography>
      </Box>

      <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Name: </Typography>
        <Typography>{student?.data.name} </Typography>
      </Box>

      <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Lastname: </Typography>
        <Typography>{student?.data.lastname} </Typography>
      </Box>

      <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Email: </Typography>
        <Typography>{student?.data.email} </Typography>
      </Box>

      <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Createdate: </Typography>
        <Typography>{String(student?.data.createdate) ?? ''} </Typography>
      </Box>

      <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>Updateddate: </Typography>
        <Typography>{String(student?.data.updateddate) ?? ''} </Typography>
      </Box>
    </Container>
  );
}
