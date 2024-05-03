import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './LoginPage.module.css';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/api/users/login', formData, {
          withCredentials: true, // Позволяет передавать cookies в запросе
        });
        navigate('/menu/profile'); // Переход на страницу профиля
      } catch (error) {
        console.error('Ошибка авторизации:', error);
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
                  type='password'
                  placeholder='Пароль'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  autoComplete='current-password'
                />
                <VpnKeyIcon className={styles.PasswordIcon} />
              </div>
            </div>
            <div className={styles.rememberForgot}>
              <label>
                <input type='checkbox' />
                Показать пароль
              </label>
              <a href='#'>Забыли пароль?</a>
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
      </section>
    </main>
  );
};

export default LoginPage;
