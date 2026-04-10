import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';
import { useForm } from '../../utils/hooks/useForm';

export const ForgotPassword: FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<Error | null>(null);

  const { values, handleChange } = useForm({ email: '' });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    forgotPasswordApi({ email: values.email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => setError(err));
  };

  return (
    <ForgotPasswordUI
      errorText={error?.message}
      email={values.email}
      setEmail={(val) =>
        handleChange({ target: { name: 'email', value: val } } as any)
      }
      handleSubmit={handleSubmit}
    />
  );
};
