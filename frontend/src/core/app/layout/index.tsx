import { Box } from '@mui/material';

import { NAV, HEADER } from './utils/config-layout';
import { Outlet } from 'react-router-dom';
import Nav from './components/nav';

const SPACING = 8;

/**
 * Renders the root layout of the application.
 *
 * @return {JSX.Element} The root layout component.
 */

function RootLayout() {
  return (
    <>
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}>
        <Nav />

        <Box
          component='main'
          sx={{
            flexGrow: 1,
            minHeight: 1,
            display: 'flex',
            flexDirection: 'column',
            py: `${HEADER.H_MOBILE + SPACING}px`,
            px: 2,
            // py: `${HEADER.H_DESKTOP + SPACING}px`,
            width: `calc(100% - ${NAV.WIDTH}px)`,
          }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default RootLayout;
