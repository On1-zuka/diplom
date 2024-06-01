import styles from './AddProductsForm.module.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export default function AddProductsForm() {
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        country: '',
        purpose: '',
        brandId: '',
        categoryId: '',
        article: '',
        price: '',
        quantity_product: '',
        img: null
    });

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/brands`);
                setBrands(response.data);
            } catch (error) {
                toast.error('Ошибка при загрузке брендов');
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/categories`);
                setCategories(response.data);
            } catch (error) {
                toast.error('Ошибка при загрузке категорий');
            }
        };
        fetchBrands();
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'img') {
            setFormData((prevData) => ({ ...prevData, img: files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            for (const key in formData) {
                data.append(key, formData[key]);
            }

            const response = await axios.post(`${process.env.API_BASE_URL}/products`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                toast.success('Товар успешно добавлен');
                // Сброс формы после успешного добавления товара
                setFormData({
                    name: '',
                    description: '',
                    country: '',
                    purpose: '',
                    brandId: '',
                    categoryId: '',
                    article: '',
                    price: '',
                    quantity_product: '',
                    img: null
                });
            }
        } catch (error) {
            toast.error(`Ошибка при добавлении товара: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className={styles.content}>
            <div className={styles.title}>Добавить товар</div>
            <form className={styles.editForm} onSubmit={handleSubmit}>
                <div className={styles.edit}>
                    <div className={styles.text}>Название:</div>
                    <input
                        type="text"
                        className={styles.name}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.edit}>
                    <div className={styles.text}>Описание:</div>
                    <textarea
                        className={styles.description}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className={styles.editSpecifications}>
                    <div className={styles.specifications}>
                        <div className={styles.country}>
                            <div className={styles.text}>Страна производителя:</div>
                            <input
                                type="text"
                                className={styles.editCountry}
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.edit}>
                            <div className={styles.text}>Предназначение:</div>
                            <textarea
                                className={styles.editDestiny}
                                name="purpose"
                                value={formData.purpose}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className={styles.edit}>
                            <div className={styles.text}>Бренд:</div>
                            <select
                                className={styles.selectBrand}
                                name="brandId"
                                value={formData.brandId}
                                onChange={handleChange}
                            >
                                <option value="">Выберите бренд</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.edit}>
                            <div className={styles.text}>Категория:</div>
                            <select
                                className={styles.selectCategories}
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                            >
                                <option value="">Выберите категорию</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.edit}>
                            <div className={styles.text}>Артикул:</div>
                            <input
                                type="text"
                                className={styles.editArticle}
                                name="article"
                                value={formData.article}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.edit}>
                    <div className={styles.text}>Цена:</div>
                    <input
                        type="number"
                        className={styles.price}
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.edit}>
                    <div className={styles.text}>Количество:</div>
                    <input
                        type="number"
                        className={styles.quantity}
                        name="quantity_product"
                        value={formData.quantity_product}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.edit}>
                    <div className={styles.text}>Изображение:</div>
                    <input type="file" className={styles.img} name="img" onChange={handleChange} />
                </div>
                <button type="submit" className={styles.saveButton}>Сохранить</button>
            </form>
            <ToastContainer />
        </div>
    );
}
