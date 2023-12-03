/* eslint-disable arrow-body-style */
import './auth.scss';
import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  setLocalStorageAuth,
  getLocalStorageAuth,
  removeLocalStorageAuth,
  setLocalStorageToken,
  getOrderCreationStorage,
} from '../../shared/api/storage-api';
import { authFormSchema } from '../../shared/schema/schema';
import Input from '../../shared/ui/input/input';
import orderApi from '../../shared/api/order-api';
import PasswordInput from '../../shared/ui/password-input/password-input';
import Button from '../../shared/ui/button/button';
import authApi from '../../shared/api/auth-api';

function Auth() {
  const authData = getLocalStorageAuth();
  const location = useLocation();
  const navigate = useNavigate();

  function createOrder(order) {
    orderApi.createOrder(order).then((data) => {
      navigate(`/order/${data.id}`, { replace: true });
    });
  }

  const onSubmit = (inputData) => {
    return authApi
      .postLogin(inputData)
      .then((data) => {
        setLocalStorageToken(data);
        removeLocalStorageAuth();
        navigate(location.state.from);
      })
      .then(() => {
        return createOrder(getOrderCreationStorage());
      })
      .catch((error) => console.log(error));
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: authData
      ? {
          email: JSON.parse(authData),
        }
      : {
          email: '',
          password: '',
        },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(authFormSchema),
  });

  useEffect(() => {
    const subscription = watch((value) => {
      setLocalStorageAuth(value.email);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <main className="auth">
      <form>
        <div className="auth__input">
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Input
                invalid={errors.email?.message}
                value={value}
                type="email"
                onChange={onChange}
                placeholder="Введите почту"
                id="email-input"
              />
            )}
          />
        </div>
        <div className="auth__input">
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <PasswordInput
                invalid={errors.password?.message}
                value={value}
                onChange={onChange}
                placeholder="Введите пароль"
                id="password"
              />
            )}
          />
        </div>
        <div className="auth__button">
          <Button
            label="Войти"
            onClick={handleSubmit(onSubmit)}
            primary
            disabled={!!Object.keys(errors).length}
          />
        </div>
      </form>
    </main>
  );
}

export default Auth;
