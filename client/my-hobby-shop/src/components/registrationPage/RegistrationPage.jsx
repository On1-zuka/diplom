import React, { useState } from 'react';
import styles from './RegistrationPage.module.css';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CallIcon from '@mui/icons-material/Call';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function RegistrationPage() {
    const [step, setStep] = useState(1);
    const [regForm, setRegForm] = useState({ login: '', email: '', password: '', name: '', surname: '', patronymic: '', address: '', phone: '' });

    const notify = () => toast("Регистрация прошла успешно!");

    async function registration(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/registration', regForm);
            console.log(response.data); // Логируем ответ от сервера для проверки
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }

    const handleNextStep = () => {
        setStep(step + 1);
    };

    return (
        <main className={styles.main}>
            <section className={styles.entryWindow}>
                <div className={styles.container}>
                    {step === 1 && (
                        <form method='post' onSubmit={registration} className={styles.entryWindow__wrapper}>
                            <div className={styles.inputTitle}>
                                <h1>Регистрация</h1>
                                <div className={styles.inputBox}>
                                    <input type="text" placeholder='Логин' value={regForm.login} onChange={(e) => {
                                        setRegForm({ ...regForm, login: e.target.value });
                                    }} />
                                    <PersonIcon className={styles.PersonIcon} />
                                </div>
                                <div className={styles.inputBox}>
                                    <input type="email" placeholder='Эл. почта' value={regForm.email} onChange={(e) => {
                                        setRegForm({ ...regForm, email: e.target.value });
                                    }} />
                                    <EmailIcon className={styles.EmailIcon} />
                                </div>
                                <div className={styles.inputBox}>
                                    <input type="password" placeholder='Пароль' value={regForm.password} onChange={(e) => {
                                        setRegForm({ ...regForm, password: e.target.value });
                                    }} />
                                    <VpnKeyIcon className={styles.PasswordIcon} />
                                </div>
                                <div className={styles.inputBox}>
                                    <input type="password" placeholder='Повторный пароль' />
                                    <VpnKeyIcon className={styles.PasswordIcon} />
                                </div>
                            </div>
                            <button type="button" className={styles.btn} onClick={handleNextStep}>Далее</button>
                        </form>
                    )}
                    {step === 2 && (
                        <form method='post' onSubmit={registration} className={styles.entryWindow__wrapper}>
                            <div className={styles.inputTitle}>
                                <h1>Регистрация</h1>
                                <div className={styles.inputBox}>
                                    <input type="text" placeholder='Имя' value={regForm.name} onChange={(e) => {
                                        setRegForm({ ...regForm, name: e.target.value });
                                    }} />
                                    <DriveFileRenameOutlineIcon className={styles.PersonIcon} />
                                </div>
                                <div className={styles.inputBox}>
                                    <input type="text" placeholder='Фамилия' value={regForm.surname} onChange={(e) => {
                                        setRegForm({ ...regForm, surname: e.target.value });
                                    }} />
                                    <DriveFileRenameOutlineIcon className={styles.PersonIcon} />
                                </div>
                                <div className={styles.inputBox}>
                                    <input type="text" placeholder='Отчество' value={regForm.patronymic} onChange={(e) => {
                                        setRegForm({ ...regForm, patronymic: e.target.value });
                                    }} />
                                    <DriveFileRenameOutlineIcon className={styles.PersonIcon} />
                                </div>
                                <div className={styles.inputBox}>
                                    <input type="text" placeholder='Телефон' value={regForm.phone} onChange={(e) => {
                                        setRegForm({ ...regForm, phone: e.target.value });
                                    }} />
                                    <CallIcon className={styles.PersonIcon} />
                                </div>
                                <div className={styles.inputBox}>
                                    <input type="text" placeholder='Адрес' value={regForm.address} onChange={(e) => {
                                        setRegForm({ ...regForm, address: e.target.value });
                                    }} />
                                    <HomeIcon className={styles.PasswordIcon} />
                                </div>
                            </div>
                            <button type="submit" className={styles.btn} onClick={notify}>Зарегистрироваться</button>
                            <ToastContainer />
                        </form>
                    )}
                </div>
            </section>
        </main>
    );
}