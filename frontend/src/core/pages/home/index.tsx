import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AppWidgetSummary from './components/app-widget-summary';
import ClassRoomCard from '@/shared/components/card/classroom-card';
import { useListClassRooms } from '@/shared/hooks/react-query/classroom';
import { useListStudents } from '@/shared/hooks/react-query/students';
import { useListTeachers } from '@/shared/hooks/react-query/teachers';

/**
 * Renders the main application view.
 *
 * @return {JSX.Element} The main application view component.
 */
export default function AppView() {
  const { classRooms, isLoading } = useListClassRooms();
  const { students, isLoading: isLoadingStudents } = useListStudents();
  const { teachers, isLoading: isLoadingTeachers } = useListTeachers();

  if (isLoading || isLoadingStudents || isLoadingTeachers) return <>loading</>;

  return (
    <Container maxWidth='xl'>
      <Typography variant='h4' sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title='Total Students'
            total={students?.length || 0}
            icon='eva:people-outline'
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title='Total teachers'
            total={teachers?.length || 0}
            icon='eva:person-outline'
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title='Total classrooms'
            total={classRooms?.length || 0}
            icon='eva:book-open-outline'
          />
        </Grid>
      </Grid>

      <Typography variant='h4' sx={{ mb: 1, mt: 5 }}>
        Last Classrooms
      </Typography>

      <Grid container spacing={3} mt={5} mb={3} xs={12} sm={12} md={12}>
        {classRooms?.slice(0, 3)?.map((classroom, index) => (
          <ClassRoomCard
            key={index}
            classroom={{
              name: classroom.name,
              description: classroom.description,
              students: classroom.students.length,
              teacher: classroom.teacher?.name || 'No teacher',
            }}
            index={index}
          />
        ))}
      </Grid>
    </Container>
  );
}
