import styles from "./Profile.module.css";
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
    const [isEditMode, setIsEditMode] = useState(false);
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
                    address: user.address,
                });
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
            }
        };
        fetchData();
    }, []);

    const saveUserData = async () => {
        try {
            const response = await axios.put(`${process.env.API_BASE_URL}/users/edit`, userData, {
                withCredentials: true,
            });
            toast.success('Данные пользователя успешно сохранены');
        } catch (error) {
            toast.error('Ошибка при сохранении данных пользователя');
            console.error('Ошибка при сохранении данных пользователя:', error);
        }
    };

    return (
        <div className={styles.dataMenu}>
            <div className={styles.headerDataMenu}>
                <div className={styles.profile}>Мой профиль</div>
                <div className={`${styles.editProfile} ${isEditMode ? styles.activeEdit : ''}`} onClick={() => setIsEditMode(!isEditMode)}>
                    <EditIcon />Редактировать
                </div>
            </div>
            <form action="" className={styles.updateProfile}>
                <div className={styles.updateProfileContent}>
                    <div className={styles.inputBox}>
                        <p>Имя</p>
                        <input type="text" placeholder="Имя" value={userData.name} readOnly={!isEditMode} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                    </div>
                    <div className={styles.inputBox}>
                        <p>Фамилия</p>
                        <input type="text" placeholder="Фамилия" value={userData.surname} readOnly={!isEditMode} onChange={(e) => setUserData({ ...userData, surname: e.target.value })} />
                    </div>
                    <div className={styles.inputBox}>
                        <p>Отчество</p>
                        <input type="text" placeholder="Отчество" value={userData.patronymic} readOnly={!isEditMode} onChange={(e) => setUserData({ ...userData, patronymic: e.target.value })} />
                    </div>
                    <div className={styles.inputBox}>
                        <p>Номер телефона</p>
                        <input type="text" placeholder="Номер телефона" value={userData.phone} readOnly={!isEditMode} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} />
                    </div>
                    <div className={styles.inputBox}>
                        <p>Адрес</p>
                        <input type="text" placeholder="Адрес" value={userData.address} readOnly={!isEditMode} onChange={(e) => setUserData({ ...userData, address: e.target.value })} />
                    </div>
                    <ToastContainer />
                </div>
                <button
                   type="button" className={`${styles.buttonProfile} ${isEditMode ? styles.showButton : styles.hideButton}`}
                    onClick={saveUserData}
                >
                    Сохранить данные
                </button>
            </form>
        </div>
    )
}
export default Profile;
