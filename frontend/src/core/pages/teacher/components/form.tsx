import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useDefaultValues, schema } from './utils/form-props';
import { TeacherFromValues } from './utils/model';
import { Button, Card, Stack, TextField, Typography } from '@mui/material';

const TeacherForm = () => {
  const {
    submit,
    isLoading,
    formValues: { defaultValues },
    status,
  } = useDefaultValues();
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm<TeacherFromValues>({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const OnHandleSubmit = (values: TeacherFromValues) => {
    submit(values);
  };

  if (isLoading) return <>loading</>;

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
              label='Lastname'
              error={errors.lastname ? true : false}
              {...register('lastname')}
              helperText={errors.lastname?.message}
            />
            <TextField
              type='email'
              sx={{ width: 1 }}
              label='Email address'
              error={errors.email ? true : false}
              helperText={errors.email?.message}
              {...register('email')}
            />
            <Button type='submit'>{status}</Button>
          </Stack>
        </Card>
      </Stack>
    </form>
  );
};

export default TeacherForm;
