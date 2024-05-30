import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useDefaultValues, schema } from './utils/form-props';
import { ClassRoomFromValues } from './utils/model';
import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useListTeachers } from '@/shared/hooks/react-query/teachers';
import { useListStudents } from '@/shared/hooks/react-query/students';

const ClassRoomForm = () => {
  const { teachers, isLoading: isTeacherLoading } = useListTeachers();
  const { students, isLoading: isStudentsLoading } = useListStudents();

  const {
    submit,
    isLoading,
    formValues: { defaultValues },
    status,
    isEditing,
  } = useDefaultValues();
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
    control,
  } = useForm<ClassRoomFromValues>({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const OnHandleSubmit = (values: ClassRoomFromValues) => {
    submit(values);
  };

  if (isLoading || isTeacherLoading || isStudentsLoading) return <>loading</>;

  return (
    <form onSubmit={handleSubmit(OnHandleSubmit)} autoComplete='off'>
      <Stack alignItems='center' justifyContent='center' direction={'column'}>
        <Card
          sx={{
            p: 5,
            width: 1,
            height: 1,
          }}>
          <Typography variant='h4'>{status}</Typography>
          <Stack spacing={3} direction={'column'} sx={{ mt: 3 }}>
            <TextField
              sx={{ width: 1 }}
              label='Name'
              error={errors.name ? true : false}
              {...register('name')}
              helperText={errors.name?.message}
            />

            <TextField
              sx={{ width: 1 }}
              label='Description'
              error={errors.description ? true : false}
              helperText={errors.description?.message}
              {...register('description')}
            />
            {isEditing && (
              <>
                <Controller
                  name='teacherId'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id='teacher-select-id'>Teacher</InputLabel>
                      <Select
                        {...field}
                        labelId='teacher-select-id'
                        label='Teacher'>
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        {teachers?.map((val) => (
                          <MenuItem
                            key={val.id}
                            value={
                              val.id
                            }>{`${val.name} ${val.lastname}`}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                <Controller
                  name='studentsId'
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id='students-select-id'>Students</InputLabel>
                      <Select
                        {...field}
                        multiple
                        labelId='students-select-id'
                        label='Students'>
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        {students?.map((val) => (
                          <MenuItem
                            key={val.id}
                            value={
                              val.id
                            }>{`${val.name} ${val.lastname}`}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </>
            )}

            <Button type='submit'>{status}</Button>
          </Stack>
        </Card>
      </Stack>
    </form>
  );
};

export default ClassRoomForm;
