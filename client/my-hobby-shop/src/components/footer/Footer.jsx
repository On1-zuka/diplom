import styles from "./Footer.module.css"
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer(){
    return(
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footer__menu}>
                    <ul className={styles.menu__list}>
                        <li className={styles.footer__menu__item}><p className={styles.footer__menu__title}>Компания</p></li>
                        <li className={styles.footer__menu__item}><a href="#" className={styles.footer__menu__link}>Бренды</a></li>
                        <li className={styles.footer__menu__item}><a href="#" className={styles.footer__menu__link}>Контакты</a></li>
                        <li className={styles.footer__menu__item}><a href="#" className={styles.footer__menu__link}>Как оформить заказ</a></li>
                    </ul>
                    <ul className={styles.menu__list}>
                        <li className={styles.footer__menu__item}><p className={styles.footer__menu__title}>Сервис и помощь</p></li>
                        <li className={styles.footer__menu__item}><a href="#" className={styles.footer__menu__link}>Доставка</a></li>
                        <li className={styles.footer__menu__item}><a href="#" className={styles.footer__menu__link}>Олата</a></li>
                    </ul>
                    <ul className={styles.menu__list}>
                        <li className={styles.footer__menu__item}><p className={styles.footer__menu__title}>Выгодно</p></li>
                        <li className={styles.footer__menu__item}><a href="#" className={styles.footer__menu__link}>Баллы</a></li>
                    </ul>
                    <ul className={styles.menu__list}>
                        <li className={styles.footer__menu__item}><p className={styles.footer__menu__title}>Обратная связь</p></li>
                        <li className={styles.footer__menu__item}><a href="#" className={styles.footer__menu__link}>Покупателям</a></li>
                        <li className={styles.footer__menu__item}>Email:<a href="#" className={styles.footer__menu__link}> kuleshilja@yandex.by</a></li>
                        <li className={styles.footer__menu__item}>Телефон:<a href="#" className={styles.footer__menu__link}> +375 (44) 788 20 35</a></li>
                    </ul>
                </div>
                <div className={styles.footer__bottom}>
                    <div className={styles.footer__bottom__txt}>
                        <p>© 2024 My hobby. Все права защищены.</p>
                    </div>
                    <div className={styles.footer__button}>
                        <ul className={styles.app}>
                            <li className={styles.app__link}><a href="#"><TelegramIcon sx={{ fontSize: 30}}/></a></li>
                            <li className={styles.app__link}><a href="#"><InstagramIcon sx={{ fontSize: 30}}/></a></li>
                            <li className={styles.app__link}><a href="#"><TwitterIcon sx={{ fontSize: 30}}/></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}