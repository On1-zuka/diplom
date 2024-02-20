import styles from '../loginPage/loginPage.module.css'
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

export default function LoginPage() {
    return (
        <main className={styles.main}>
            <section className={styles.entryWindow}>
                <div className={styles.container}>
                    <div className={styles.entryWindow__wrapper}>
                        <div className={styles.inputTitle}>
                            <h1>Авторизация</h1>
                            <div className={styles.inputBox}>
                                <input type="text" placeholder='Эл. почта' />
                                <EmailIcon className={styles.EmailIcon}/>
                            </div>
                            <div className={styles.inputBox}>
                                <input type="password" placeholder='Пароль' />
                                <VpnKeyIcon className={styles.PasswordIcon}/>
                            </div>
                        </div>
                        <div className={styles.rememberForgot}>
                            <label><input type="checkbox"/>Запомнить меня</label>
                            <a href="#">Забыли пароль?</a>
                        </div>
                        <button type="submit" className={styles.btn}>Войти</button>
                        <div className={styles.registerLink}>
                        <p>У вас нет аккаунта? <a href="#">Зарегистрировать</a> </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}