import { FC, SyntheticEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, selectLoginError } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../utils/hooks/useForm';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorText = useSelector(selectLoginError);

  const { values, handleChange } = useForm({ email: '', password: '' });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email: values.email, password: values.password }))
      .unwrap()
      .then(() => navigate('/'))
      .catch(() => {});
  };

  return (
    <LoginUI
      errorText={errorText ?? ''}
      email={values.email}
      setEmail={(val) =>
        handleChange({ target: { name: 'email', value: val } } as any)
      }
      password={values.password}
      setPassword={(val) =>
        handleChange({ target: { name: 'password', value: val } } as any)
      }
      handleSubmit={handleSubmit}
    />
  );
};
