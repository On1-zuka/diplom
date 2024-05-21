import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Modal from "../modal/Modal";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const handleSearchClick = () => {
        setModalOpen(true);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.header__up}>
                    <nav className={styles.menu__up}>
                        <ul className={styles.menu_up__list}>
                            <li className={styles.menu_up__list_item}>
                                <Link to='/delivery' className={styles.menu_up__list_link}>
                                    Доставка
                                </Link>
                            </li>
                            <li className={styles.menu_up__list_item}>
                                <Link to='/payment' className={styles.menu_up__list_link}>
                                    Оплата
                                </Link>
                            </li>
                            <li className={styles.menu_up__list_item}>
                                <a href="#" className={styles.menu_up__list_link}>
                                    О нас
                                </a>
                            </li>
                            <li className={styles.menu_up__list_item}>
                                <a href="#" className={styles.menu_up__list_link}>
                                    Контакты
                                </a>
                            </li>
                            <li className={styles.menu_up__list_item}>
                                <a href="#" className={styles.menu_up__list_link}>
                                    +375 (44) 788 20 35
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className={styles.header__inner}>
                    <Link to="/" className={styles.logo}>
                        <img src={logo} alt="Логотип" className={styles.logo__img} />
                    </Link>
                    <div className={styles.search__bar} onClick={handleSearchClick}>
                        <button className={styles.search__bar__btn}>
                            <SearchIcon />
                        </button>
                        <input
                            placeholder="Поиск товаров..."
                            type="text"
                            className={styles.search__bar__txt}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <nav className={styles.menu}>
                        <ul className={styles.menu__list}>
                            <li
                                className={styles.menu__list__items}
                                onClick={() => navigate("/authorization")}
                            >
                                <PersonIcon />
                                Профиль
                            </li>
                           
                            <li
                                className={styles.menu__list__items}
                                onClick={() => navigate("/menu/cart")}
                            >
                                <ShoppingCartIcon />
                                Корзина
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </header>
    );
}
