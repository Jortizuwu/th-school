import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';

import { NAV } from '../utils/config-layout';
import navConfig from './config-navigation';
import { useLocation } from 'react-router-dom';
import Scrollbar from '@/shared/components/scrollbar';

// ----------------------------------------------------------------------

export default function Nav() {
  const renderMenu = (
    <Stack component='nav' spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        py: 3,
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}>
      {renderMenu}
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}>
      <Box
        sx={{
          height: 1,
          position: 'fixed',
          width: NAV.WIDTH,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}>
        {renderContent}
      </Box>
    </Box>
  );
}

function NavItem({
  item,
}: {
  item: { title: string; path: string; icon: JSX.Element };
}) {
  const { pathname } = useLocation();

  const active = item.path === pathname;

  return (
    <ListItemButton
      // component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}>
      <Box component='span' sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component='span'>{item.title} </Box>
    </ListItemButton>
  );
}
