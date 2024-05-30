import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Iconify from '../iconify';

export default function ClassRoomCard({
  classroom,
  index,
}: {
  classroom: {
    name: string;
    description: string;
    students: number;
    teacher: string;
  };
  index: number;
}) {
  const { description, name, students, teacher } = classroom;

  const latestPostLarge = index === 0;

  const latestPost = index === 1 || index === 2;

  const renderTitle = (
    <Typography
      sx={{
        height: 44,
        overflow: 'hidden',
        WebkitLineClamp: 2,
      }}>
      {name}
    </Typography>
  );

  const renderInfo = (
    <Stack
      direction='row'
      flexWrap='wrap'
      spacing={1.5}
      justifyContent='flex-end'
      sx={{
        mt: 3,
      }}>
      {[
        { number: students, icon: 'eva:people-fill' },
        { number: teacher, icon: 'eva:person-fill' },
      ].map((info, _index) => (
        <Stack key={_index} direction='row'>
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
          <Typography variant='caption'>{info.number}</Typography>
        </Stack>
      ))}
    </Stack>
  );

  const renderDate = (
    <Typography
      variant='caption'
      component='div'
      sx={{
        mb: 2,
        color: 'text.disabled',
      }}>
      {description}
    </Typography>
  );

  return (
    <Grid xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card>
        <Box
          sx={{
            color: '#0000',
            position: 'relative',
            pt: 'calc(100% * 1 / 4)',
          }}></Box>

        <Box
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
            ...((latestPostLarge || latestPost) && {
              width: 1,
              bottom: 0,
              position: 'absolute',
            }),
          }}>
          {renderDate}
          {renderTitle}
          {renderInfo}
        </Box>
      </Card>
    </Grid>
  );
}
