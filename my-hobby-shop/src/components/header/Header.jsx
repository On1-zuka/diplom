import {useState} from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import ReorderIcon from '@mui/icons-material/Reorder';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from "react-router-dom";

export default function Header(){
    const [isOpen, setOpen] = useState(false);
    const navigate = useNavigate();
    return(
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.header__up}>
                    <nav className={styles.menu__up}>
                        <ul className={styles.menu_up__list}>
                            <li className={styles.menu_up__list_item}><a href="#" className={styles.menu_up__list_link}>Доставка</a></li>
                            <li className={styles.menu_up__list_item}><a href="#" className={styles.menu_up__list_link}>Оплата</a></li>
                            <li className={styles.menu_up__list_item}><a href="#" className={styles.menu_up__list_link}>О нас</a></li>
                            <li className={styles.menu_up__list_item}><a href="#" className={styles.menu_up__list_link}>Контакты</a></li>
                            <li className={styles.menu_up__list_item}><a href="#" className={styles.menu_up__list_link}>+375 (44) 788 20 35</a></li>
                        </ul>
                    </nav>
                </div>
                <div className={styles.header__inner}>
                    <Link to = '/' href="#" className={styles.logo}>
                        <img src={logo} alt="Логотип" className={styles.logo__img} />
                    </Link>
                    <div className={styles.catalog}>
                        <button className={styles.catalog__button}><a href="#" className={styles.catalog__icon} onClick={()=> setOpen(!isOpen)}>
                            <ReorderIcon sx={{ fontSize: 35}}/></a></button>
                        <div className={`${styles.catalog__items} ${isOpen ? styles.active : ''}`}>     
                        <ul className={styles.catalog__list }>
                            <li className={styles.catalog__item}>Profile</li>
                            <li className={styles.catalog__item}>Bonus</li>
                            <li className={styles.catalog__item}>Notify</li>
                            <li className={styles.catalog__item}>Location</li>
                            <li className={styles.catalog__item}>Setting</li>
                        </ul>
                        </div> 
                    </div>
                    <div className={styles.search__bar}>
                        <button className={styles.search__bar__btn}>
                            <SearchIcon/>
                        </button>
                        <input placeholder="Поиск товаров..." type="text" className={styles.search__bar__txt} />
                    </div>
                    <nav className={styles.menu}>
                        <ul className={styles.menu__list}>
                            <li className={styles.menu__list__items} onClick={()=>navigate('/authorization')}><PersonIcon/>Профиль</li>
                            <li className={styles.menu__list__items}><FavoriteIcon/>Избранное</li>
                            <li className={styles.menu__list__items}><ShoppingCartIcon/>Корзина</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}