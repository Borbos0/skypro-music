'use client';

import { regUser } from '@/services/auth/authApi';
import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim() || !username.trim()) {
      return setErrorMessage('Заполните все поля');
    }
    setIsLoading(true);

    regUser({ email, password, username })
      .then((res) => {
        localStorage.setItem('userId', res.result._id.toString());
        router.replace('/music/main');
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            setErrorMessage('Что-то с интернетом');
          } else {
            setErrorMessage('Неизвестная ошибка');
          }
          console.log(error.config);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </Link>
      <div className={styles.errorContainer}>{errorMessage}</div>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="username"
        placeholder="Имя пользователя"
        onChange={onChangeUsername}
      />
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="email"
        placeholder="Почта"
        onChange={onChangeEmail}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <div className={styles.errorContainer}></div>
      <button
        className={styles.modal__btnSignup}
        disabled={isLoading}
        onClick={onSubmit}
      >
        Зарегистрироваться
      </button>
    </>
  );
}
