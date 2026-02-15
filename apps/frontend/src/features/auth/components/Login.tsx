'use client';

import { Button } from '@/components/atoms/Button/button';
import { InputField } from '@/components/atoms/Input/InputField';
import { FormProvider, useForm } from 'react-hook-form';
import { useLogin } from '../hooks/useAuth';

type LoginFormValues = {
  email: string;
  password: string;
};

export function Login() {
  const methods = useForm<LoginFormValues>();

  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;

  const { mutate: login, isPending } = useLogin();

  const onSubmit = (data: LoginFormValues) => {
    login(data, {
      onError: (error: any) => {
        setError('root', {
          type: 'manual',
          message: error.message || 'Login failed',
        });
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Login</h2>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <InputField
              name="email"
              label="Email"
              rules={{ required: 'Email is required' }}
              isRequired
            />

            <InputField
              name="password"
              label="Password"
              type="password"
              rules={{ required: 'Password is required' }}
              isRequired
            />

            {errors.root && (
              <p className="text-red-500 text-sm text-center">{errors.root.message}</p>
            )}

            <Button
              label={isPending ? 'Logging in...' : 'Login'}
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-500 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
