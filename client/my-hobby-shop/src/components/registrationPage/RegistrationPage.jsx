import React, { useState } from 'react';
import styles from './RegistrationPage.module.css';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CallIcon from '@mui/icons-material/Call';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegistrationPage() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [regForm, setRegForm] = useState({ login: '', email: '', password: '', confirmPassword: '', name: '', surname: '', patronymic: '', address: '', phone: '' });
    const [formData, setFormData] = useState({
        to: '',
        subject: '',
        text: '',
    });

    const emailValidator = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleNextStep = () => {
        if (step === 1) {
            if (!emailValidator(regForm.email)) {
                toast.error('Некорректный формат email');
                return;
            }
            if (!passwordValidator(regForm.password)) {
                toast.error('Пароль должен содержать минимум 8 символов');
                return;
            }
            if (regForm.password !== regForm.confirmPassword) {
                toast.error('Пароли не совпадают');
                return;
            }
        }
        setStep(step + 1);
    };

    async function registration(e) {
        e.preventDefault();
        try {
            // Обрезаем пробелы перед отправкой данных на сервер
            const trimmedRegForm = {
                login: regForm.login.trim(),
                email: regForm.email.trim(),
                password: regForm.password.trim(),
                confirmPassword: regForm.confirmPassword.trim(),
                name: regForm.name.trim(),
                surname: regForm.surname.trim(),
                patronymic: regForm.patronymic.trim(),
                address: regForm.address.trim(),
                phone: regForm.phone.trim()
            };

            const response = await axios.post(`${process.env.API_BASE_URL}/users/registration`, trimmedRegForm);
            console.log(response.data);
            toast.success('Регистрация прошла успешно!');
            sendEmail(trimmedRegForm.email);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(`Ошибка авторизации: ${error.response.data.message}`);
            } else {
                toast.error('Ошибка авторизации: неизвестная ошибка');
            }
        }
    }

    const sendEmail = async (email) => {
        try {
            const updatedFormData = {
                to: email,
                subject: 'Добро пожаловать!',
                html: '',
            };

            setFormData(updatedFormData);

            await axios.post(`${process.env.API_BASE_URL}/email/send-email-user`, updatedFormData);
            toast.success('Электронное письмо успешно отправлено!');
            navigate('/authorization');
        } catch (error) {
            console.error('Ошибка при отправке письма:', error);
            toast.error('Ошибка при отправке электронного письма');
        }
    };

    const passwordValidator = (password) => {
        return password.length >= 8;
    };

    
    return (
        <main className={styles.main}>
            <section className={styles.entryWindow}>
                <div className={styles.container}>
                    {step === 1 && (
                        <form className={styles.entryWindow__wrapper}>
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
                                    <input type="password" placeholder='Повторный пароль' value={regForm.confirmPassword} onChange={(e) => {
                                        setRegForm({ ...regForm, confirmPassword: e.target.value });
                                    }} />
                                    <VpnKeyIcon className={styles.PasswordIcon} />
                                </div>
                            </div>
                            <button type="button" className={styles.btn} onClick={handleNextStep}>Далее</button>
                            <ToastContainer />
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
                            <button type="submit" className={styles.btn}>Зарегистрироваться</button>
                            <ToastContainer />
                        </form>
                    )}
                </div>
            </section>
        </main>
    );
}
