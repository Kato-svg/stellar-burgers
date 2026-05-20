import { FC, SyntheticEvent } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  registerUser,
  selectRegisterError
} from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../utils/hooks/useForm';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorText = useSelector(selectRegisterError);

  const { values, handleChange } = useForm({
    userName: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({
        name: values.userName,
        email: values.email,
        password: values.password
      })
    )
      .unwrap()
      .then(() => navigate('/'))
      .catch(() => {});
  };

  return (
    <RegisterUI
      errorText={errorText ?? ''}
      email={values.email}
      userName={values.userName}
      password={values.password}
      setEmail={(val) =>
        handleChange({ target: { name: 'email', value: val } } as any)
      }
      setPassword={(val) =>
        handleChange({ target: { name: 'password', value: val } } as any)
      }
      setUserName={(val) =>
        handleChange({ target: { name: 'userName', value: val } } as any)
      }
      handleSubmit={handleSubmit}
    />
  );
};
