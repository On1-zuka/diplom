import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './LoginPage.module.css';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/menu/profile');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.API_BASE_URL}/users/login`, formData, {
        withCredentials: true,
      });
      if (response.data) {
        setUser(response.data.user);
        login();

        if (response.data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/menu/profile');
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Ошибка авторизации: ${error.response.data.message}`);
      } else {
        toast.error('Ошибка авторизации: неизвестная ошибка');
      }
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.entryWindow}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.entryWindow__wrapper}>
            <div className={styles.inputTitle}>
              <h1>Авторизация</h1>
              <div className={styles.inputBox}>
                <input
                  type='email'
                  placeholder='Эл. почта'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  autoComplete='current-password'
                />
                <EmailIcon className={styles.EmailIcon} />
              </div>
              <div className={styles.inputBox}>
                <input
                  type={showPassword ? 'text' : 'password'} // изменение типа поля в зависимости от состояния
                  placeholder="Пароль"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  autoComplete="current-password"
                />
                <VpnKeyIcon className={styles.PasswordIcon} />
              </div>
            </div>
            <div className={styles.rememberForgot}>
              <label>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)} // изменение состояния при клике
                />
                Показать пароль
              </label>
            </div>
            <button type='submit' className={styles.btn}>
              Войти
            </button>
            <div className={styles.registerLink}>
              <p>
                У вас нет аккаунта?{' '}
                <span className={styles.regLink} onClick={() => navigate('/registration')}>
                  Зарегистрировать
                </span>
              </p>
            </div>
          </form>
        </div>
        <ToastContainer />
      </section>
    </main>
  );
};

export default LoginPage;
