import Iconify from '@/shared/components/iconify';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function AppWidgetSummary({
  title,
  total,
  icon,
}: {
  icon: string;
  title: string;
  total: number;
}) {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction='row'
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
      }}>
      <Iconify icon={`${icon}`} sx={{ mr: 2 }} />
      <Stack spacing={0.5}>
        <Typography variant='h4'>{total}</Typography>
        <Typography variant='subtitle2' sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}
