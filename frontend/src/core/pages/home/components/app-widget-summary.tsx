import Iconify from '@/shared/components/iconify';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/**
 * Renders a summary widget with an icon, title, and total value.
 *
 * @param {Object} props - The component props.
 * @param {string} props.icon - The icon to display.
 * @param {string} props.title - The title of the widget.
 * @param {number} props.total - The total value to display.
 * @return {JSX.Element} The rendered summary widget.
 */
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
