import axios from 'axios';
import styles from './SelectionAdmin.module.css'
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';

export default function SelectionAdmin() {
    const navigate = useNavigate();

    const {logout} = useAuth();
    const {setUser} = useUser();

    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.API_BASE_URL}/users/logout`, null, {
                withCredentials: true,
            });
            logout();
            setUser(null);
            navigate('/');
        } catch (error) {
            toast.error('Ошибка при выходе из аккаунта:');
        }
    };
    return (
        <div className={styles.main}>
            <section className={styles.selectionPage}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.controlMenu}>
                            <div className={styles.bottomMenu}>
                                <ul className={styles.listMenu}>
                                    <li onClick={() => navigate('/admin/order')}>Заказы</li>
                                    <li onClick={() => navigate('/admin/editProducts')}>Изменение и удаление товаров </li>
                                    <li onClick={() => navigate('/admin/addProducts')}>Добавление товаров</li>
                                    <li onClick={() => navigate('/admin/editBrands')}>Изменение и удаление брендов</li>
                                    <li onClick={() => navigate('/admin/addBrands')}>Добавление брендов</li>
                                    <li onClick={() => navigate('/admin/editCategories')}>Изменение и удаление категории</li>
                                    <li onClick={()=> navigate('/admin/addCategories')}>Добавление категории</li>
                                    <li onClick={handleLogout}>Выход</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Outlet />
                </div>
            </section>
        </div>
    )
}