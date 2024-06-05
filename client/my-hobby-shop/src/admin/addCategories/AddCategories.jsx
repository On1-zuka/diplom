import styles from './AddCategories.module.css'
import { ToastContainer, toast } from 'react-toastify'; // Импортируем компоненты для уведомлений
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import React, { useState } from 'react';

export default function AddCategories(){
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка на пустые поля
        if (!name || !image) {
            toast.error('Пожалуйста, заполните все поля');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('img', image);

            const response = await axios.post(`${process.env.API_BASE_URL}/categories`, formData);
            if (response.status === 200) {
                toast.success('Категория успешно добавлена');
                setName('');
                setImage(null);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(`Ошибка добавления категории: ${error.response.data.message}`);
            } else {
                console.error('Ошибка добавления категории', error);
                toast.error('Ошибка добавления категории');
            }
        }
    };

    return (
        <div className={styles.content}>
            <div className={styles.title}>Добавление категории</div>
            <form className={styles.editForm} onSubmit={handleSubmit}>
                <div className={styles.edit}>
                    <div className={styles.text}>Название:</div>
                    <input
                        type="text"
                        className={styles.name}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={styles.edit}>
                    <div className={styles.text}>Изображение:</div>
                    <input
                        type="file"
                        className={styles.img}
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <button type="submit" className={styles.saveButton}>Сохранить</button>
            </form>
            <ToastContainer />
        </div>
    );
}

