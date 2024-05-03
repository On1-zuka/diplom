import styles from './SelectionMenu.module.css';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function SelectionMenu(){
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        id: '',
        login: '',
        email: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/profile`, {
                    withCredentials: true,
                });
                const user = response.data.user;
                setUserData({
                    id: user.id,
                    login: user.login,
                    email: user.email
                });
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.main}>
            <section className={styles.selectionPage}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.controlMenu}>
                            <div className={styles.headerMenu}>
                                <div className={styles.loginMenu}>{userData.login}</div>
                                <div className={styles.emailMenu}>{userData.email}</div>
                            </div>
                            <div className={styles.bottomMenu}>
                                <ul className={styles.listMenu}>
                                    <li onClick={()=>navigate('/menu/profile')}><PersonIcon />Мой профиль </li>
                                    <li onClick={()=>navigate('/menu/cart')}><ShoppingCartIcon />Корзина</li>
                                    <li><FavoriteIcon />Избранное</li>
                                    <li><ExitToAppIcon />Выход из аккаунта</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Outlet/>
                </div>
            </section>
        </div>
    )
}