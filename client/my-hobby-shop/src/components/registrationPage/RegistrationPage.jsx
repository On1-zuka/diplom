import styles from './RegistrationPage.module.css'
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import axios from 'axios';

export default function RegistrationPage(){

    const [regForm, setRegForm] = useState({login: '', email: '', password: ''})
    async function registration (e){
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/registration', regForm);
            console.log(response.data); // Логируем ответ от сервера для проверки
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }
    return(
        <main className={styles.main}>
            <section className={styles.entryWindow}>
                <div className={styles.container}>
                    <form method='post' onSubmit={registration} className={styles.entryWindow__wrapper}>
                        <div className={styles.inputTitle}>
                            <h1>Регистрация</h1>
                            <div className={styles.inputBox}>
                                <input type="text" placeholder='Имя' value={regForm.login} onChange={(e)=>{
                                    setRegForm({...regForm, login:e.target.value});
                                }}/>
                                <PersonIcon className={styles.PersonIcon}/>
                            </div>
                            <div className={styles.inputBox}>
                                <input type="email" placeholder='Эл. почта' value={regForm.email} onChange={(e)=>{
                                    setRegForm({...regForm, email:e.target.value});
                                }}/>
                                <EmailIcon className={styles.EmailIcon}/>
                            </div>
                            <div className={styles.inputBox}>
                                <input type="password" placeholder='Пароль' value={regForm.password} onChange={(e)=>{
                                    setRegForm({...regForm, password:e.target.value});
                                }}/>
                                <VpnKeyIcon className={styles.PasswordIcon}/>
                            </div>
                            <div className={styles.inputBox}>
                                <input type="password" placeholder='Повторный пароль' />
                                <VpnKeyIcon className={styles.PasswordIcon}/>
                            </div>
                        </div>
                        <button type="submit" className={styles.btn}>Зарегистрироваться</button>
                    </form>
                </div>
            </section>
        </main>
    )
}