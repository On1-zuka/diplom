import styles from "./Footer.module.css"
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footer__menu}>
                    <ul className={styles.menu__list}>
                        <li className={styles.footer__menu__item}><p className={styles.footer__menu__title}>Компания</p></li>
                        <li className={styles.footer__menu__item}><Link to='/brands' className={styles.footer__menu__link}>Бренды</Link></li>
                        <li className={styles.footer__menu__item}><Link to='/contacts' className={styles.footer__menu__link}>Контакты</Link></li>
                        <li className={styles.footer__menu__item}><Link to='/decoration' className={styles.footer__menu__link}>Как оформить заказ</Link></li>
                    </ul>
                    <ul className={styles.menu__list}>
                        <li className={styles.footer__menu__item}><p className={styles.footer__menu__title}>Сервис и помощь</p></li>
                        <li className={styles.footer__menu__item}><Link to='/delivery' className={styles.footer__menu__link}>Доставка</Link></li>
                        <li className={styles.footer__menu__item}><Link to='/payment' className={styles.footer__menu__link}>Олата</Link></li>
                    </ul>
                    <ul className={styles.menu__list}>
                        <li className={styles.footer__menu__item}><p className={styles.footer__menu__title}>Выгодно</p></li>
                        <li className={styles.footer__menu__item}><Link to='/ball' className={styles.footer__menu__link}>Баллы</Link></li>
                    </ul>
                    <ul className={styles.menu__list}>
                        <li className={styles.footer__menu__item}><p className={styles.footer__menu__title}>Обратная связь</p></li>
                        <li className={styles.footer__menu__item}>
                            <a href="mailto:myhobbya75@gmail.com">Email: myhobbya75@gmail.com</a>
                        </li>
                        <li className={styles.footer__menu__item}>
                            <a href="tel:+375447882035">Телефон: +375 (44) 788 20 35</a>
                        </li>
                    </ul>
                </div>
                <div className={styles.footer__bottom}>
                    <div className={styles.footer__bottom__txt}>
                        <p>© 2024 My hobby. Все права защищены.</p>
                    </div>
                    <div className={styles.footer__button}>
                        <ul className={styles.app}>
                            <li className={styles.app__link}>
                                <a href="https://t.me/On1_zuka" target="_blank" rel="noopener noreferrer">
                                    <TelegramIcon sx={{ fontSize: 30 }} />
                                </a>
                            </li>
                            <li className={styles.app__link}>
                                <a href="https://www.instagram.com/on1_zuka?igsh=MTJsYmE4Nzk1ZGQzaw==" target="_blank" rel="noopener noreferrer">
                                    <InstagramIcon sx={{ fontSize: 30 }} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}