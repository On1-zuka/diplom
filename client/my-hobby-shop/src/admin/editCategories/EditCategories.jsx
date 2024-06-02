import styles from './EditCategories.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditCategories(){
    const { id } = useParams();
    const [category, setCategory] = useState({
        name: '',
        img: null
    });
    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/categories/${id}`);
                setCategory({
                    name: response.data.name,
                    img: response.data.img
                });
                setCurrentImage(`${process.env.API_BASE_URL}/images/${response.data.img}`);
            } catch (error) {
                handleFetchError(error, 'Ошибка при загрузке данных о категории');
            }
        };

        fetchBrand();
    }, [id]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCategory(prevState => ({
            ...prevState,
            img: file
        }));
        setCurrentImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', category.name);
        formData.append('img', category.img);
        try {
            const response = await axios.patch(`${process.env.API_BASE_URL}/categories/${id}`, formData);
            toast.success('Категория успешно обновлена');
        } catch (error) {
            handleFetchError(error, 'Ошибка при обновлении категории');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFetchError = (error, defaultMessage) => {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(`${defaultMessage}: ${error.response.data.message}`);
        } else {
            console.error(defaultMessage, error);
            toast.error(defaultMessage);
        }
    };

    return (
        <div className={styles.content}>
            <div className={styles.title}>Изменить категорию</div>
            <form className={styles.editForm} onSubmit={handleSubmit}>
                <div className={styles.edit}>
                    <div className={styles.text}>Название:</div>
                    <input
                        type="text"
                        className={styles.name}
                        name="name"
                        value={category.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.edit}>
                    <div className={styles.text}>Изображение:</div>
                    <input type="file" className={styles.img} onChange={handleFileChange} />
                    {currentImage && (
                        <img
                            src={currentImage}
                            alt="Текущее изображение"
                            className={styles.currentImage}
                        />
                    )}
                </div>
                <button type="submit" className={styles.saveButton}>Сохранить</button>
            </form>
            <ToastContainer />
        </div>
    );
}