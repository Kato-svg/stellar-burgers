import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectUser, updateUser } from '../../services/slices/userSlice';
import { useForm } from '../../utils/hooks/useForm';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [updateUserError, setUpdateUserError] = useState<string | undefined>(
    undefined
  );

  const { values, setValues, reset, handleChange } = useForm({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    values.name !== user?.name ||
    values.email !== user?.email ||
    !!values.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setUpdateUserError(undefined);
    dispatch(updateUser(values))
      .unwrap()
      .catch((err: Error) =>
        setUpdateUserError(err?.message || 'Ошибка сохранения')
      );
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    reset({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
    setUpdateUserError(undefined);
  };

  return (
    <ProfileUI
      formValue={values}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleChange}
      updateUserError={updateUserError}
    />
  );
};
