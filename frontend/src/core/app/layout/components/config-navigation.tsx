import Iconify from '@/shared/components/iconify';

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: <Iconify icon='eva:home-outline' sx={{ mr: 2 }} />,
  },
  {
    title: 'students',
    path: '/students',
    icon: <Iconify icon='eva:people-outline' sx={{ mr: 2 }} />,
  },
  {
    title: 'teachers',
    path: '/teachers',
    icon: <Iconify icon='eva:person-outline' sx={{ mr: 2 }} />,
  },
  {
    title: 'classroom',
    path: '/classroom',
    icon: <Iconify icon='eva:book-open-outline' sx={{ mr: 2 }} />,
  },
];

export default navConfig;
