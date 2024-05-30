import { useRef, useState } from 'react';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Iconify from '@/shared/components/iconify';
import { IconButton, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '@/shared/constants';
import classRoomServices from '@/shared/services/classroom';
import { Notify } from '@/shared/utils/notify';

export default function ClassRoomTableRow({
  id,
  name,
  description,
  createdAt,
  updatedAt,
}: {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const queryClient = useQueryClient();

  const { mutate, isLoading: isLoadingMutation } = useMutation(
    [QUERY_KEYS.CLASS, id],
    () => classRoomServices.deleteClassRoom(String(id)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS.CLASS]);
        Notify('class deleted', null);
      },
      onError: (error) => {
        Notify(`opps!  ${error}`, 'error');
      },
    },
  );

  const navigate = useNavigate();

  const handleUpdate = () => {
    setOpen(false);
    navigate(`/classroom/update/${id}`);
  };

  const handleView = () => {
    setOpen(false);
    navigate(`/classroom/details/${id}`);
  };
  const handleDelete = () => {
    void mutate();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenMenu = () => {
    setOpen(true);
  };

  if (isLoadingMutation) return <>loading</>;

  return (
    <>
      <TableRow>
        <TableCell component='th' scope='row' padding='none'>
          <Stack direction='row' alignItems='center' spacing={2} px={2}>
            <Typography variant='subtitle2' noWrap>
              {id}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{name}</TableCell>

        <TableCell>{description}</TableCell>

        <TableCell>{createdAt}</TableCell>
        <TableCell>{updatedAt}</TableCell>
        <TableCell align='right' ref={menuRef}>
          <IconButton
            onClick={() => {
              handleOpenMenu();
            }}>
            <Iconify icon='eva:more-vertical-fill' />
          </IconButton>
        </TableCell>
      </TableRow>
      <Popover
        open={!!open}
        anchorEl={menuRef.current}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuItem onClick={handleView}>
          <Iconify icon='eva:eye-fill' sx={{ mr: 2 }} />
          view
        </MenuItem>

        <MenuItem onClick={handleUpdate}>
          <Iconify icon='eva:edit-fill' sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={() => handleDelete()} sx={{ color: 'error.main' }}>
          <Iconify icon='eva:trash-2-outline' sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
