import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './EditBrands.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditBrands() {
    const { id } = useParams();
    const [brand, setBrand] = useState({
        name: '',
        img: null
    });
    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/brands/${id}`);
                setBrand({
                    name: response.data.name,
                    img: response.data.img
                });
                setCurrentImage(`${process.env.API_BASE_URL}/images/${response.data.img}`);
            } catch (error) {
                handleFetchError(error, 'Ошибка при загрузке данных о бренде');
            }
        };

        fetchBrand();
    }, [id]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setBrand(prevState => ({
            ...prevState,
            img: file
        }));
        setCurrentImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', brand.name);
        formData.append('img', brand.img);
        try {
            const response = await axios.patch(`${process.env.API_BASE_URL}/brands/${id}`, formData);
            console.log(response.data);
            toast.success('Бренд успешно обновлен');
        } catch (error) {
            handleFetchError(error, 'Ошибка при обновлении бренда');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBrand(prevState => ({
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
            <div className={styles.title}>Изменить бренда</div>
            <form className={styles.editForm} onSubmit={handleSubmit}>
                <div className={styles.edit}>
                    <div className={styles.text}>Название:</div>
                    <input
                        type="text"
                        className={styles.name}
                        name="name"
                        value={brand.name}
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
