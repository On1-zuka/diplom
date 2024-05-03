import styles from "./Profile.module.css"
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import axios from 'axios';
//import Cookies from 'js-cookie';

const Profile = () => {
    const [userData, setUserData] = useState({
        id: '',
        login: '',
        email: '',
        name: '',
        surname: '',
        patronymic: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/users/profile`, {
                    withCredentials: true,
                });
                const user = response.data.user;
                setUserData({
                    id: user.id,
                    login: user.login,
                    email: user.email,
                    name: user.name,
                    surname: user.surname,
                    patronymic: user.patronymic,
                    phone: user.phone,
                    address: user.address
                });
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.dataMenu}>
            <div className={styles.headerDataMenu}>
                <div className={styles.profile}>Мой профиль</div>
                <div className={styles.deleteProfile}><DeleteIcon />Удалить аккаунт</div>
            </div>
            <form action="" className={styles.updateProfile} >
                <div className={styles.updateProfileContent}>
                    <div className={styles.inputBox}>
                        <p>Имя</p>
                        <input type="text" placeholder="Имя" value={userData.name} onChange={
                            (e) => setUserData({ ...userData, name: e.target.value })
                        } />
                    </div>
                    <div className={styles.inputBox}>
                        <p>Фамилия</p>
                        <input type="text" placeholder="Фамилия" value={userData.surname} onChange={
                            (e) => setUserData({ ...userData, surname: e.target.value })
                        } />
                    </div>
                    <div className={styles.inputBox}>
                        <p>Отчество</p>
                        <input type="text" placeholder="Отчество" value={userData.patronymic} onChange={
                            (e) => setUserData({ ...userData, patronymic: e.target.value })
                        } />
                    </div>
                    <div className={styles.inputBox}>
                        <p>Номер телефона</p>
                        <input type="text" placeholder="Номер телефона" value={userData.phone} onChange={
                            (e) => setUserData({ ...userData, phone: e.target.value })
                        } />
                    </div>
                    <div className={styles.inputBox}>
                        <p>Адрес</p>
                        <input type="text" placeholder="Адрес" value={userData.address} onChange={
                            (e) => setUserData({ ...userData, address: e.target.value })
                        } />
                    </div>
                </div>
                <button className={styles.buttonProfile}>Сохранить данные</button>
            </form>
        </div>
    )
}
export default Profile;