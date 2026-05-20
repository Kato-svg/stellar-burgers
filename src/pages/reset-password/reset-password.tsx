import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPasswordApi } from '@api';
import { ResetPasswordUI } from '@ui-pages';
import { useForm } from '../../utils/hooks/useForm';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<Error | null>(null);

  const { values, handleChange } = useForm({ password: '', token: '' });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    resetPasswordApi({ password: values.password, token: values.token })
      .then(() => {
        localStorage.removeItem('resetPassword');
        navigate('/login');
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={error?.message}
      password={values.password}
      token={values.token}
      setPassword={(val) =>
        handleChange({ target: { name: 'password', value: val } } as any)
      }
      setToken={(val) =>
        handleChange({ target: { name: 'token', value: val } } as any)
      }
      handleSubmit={handleSubmit}
    />
  );
};
