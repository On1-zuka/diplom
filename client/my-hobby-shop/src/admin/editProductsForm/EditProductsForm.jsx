import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './EditProductsForm.module.css';

export default function EditProductsForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        brand: '',
        country: '',
        brandId: '',
        category: '',
        categoryId: '',
        purpose: '',
        article: '',
        price: '',
        quantity_product: '',
        img: null
    });
    const [currentImage, setCurrentImage] = useState(null);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/products/${id}`);
                const productData = response.data;
                setProduct(productData);
                setCurrentImage(productData.img);
            } catch (error) {
                handleFetchError(error, 'Ошибка при загрузке данных');
            }
        };

        const fetchBrands = async () => {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/brands`);
                setBrands(response.data);
            } catch (error) {
                handleFetchError(error, 'Ошибка при загрузке брендов');
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/categories`);
                setCategories(response.data);
            } catch (error) {
                handleFetchError(error, 'Ошибка при загрузке категорий');
            }
        };

        fetchProduct();
        fetchBrands();
        fetchCategories();
    }, [id]);

    const handleFetchError = (error, defaultMessage) => {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(`${defaultMessage}: ${error.response.data.message}`);
        } else {
            console.error(defaultMessage, error);
            toast.error(defaultMessage);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setCurrentImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('country', product.country);
        formData.append('purpose', product.purpose);
        formData.append('article', product.article);
        formData.append('price', product.price);
        formData.append('brandId', Number(product.brandId));
        formData.append('categoryId', Number(product.categoryId));
        formData.append('quantity_product', product.quantity_product);
        if (file) {
            formData.append('img', file);
        }
        try {
            await axios.patch(`${process.env.API_BASE_URL}/products/${id}`, formData);
            toast.success('Товар успешно обновлен');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(`Ошибка при обновлении товара: ${error.response.data.message}`);
            } else {
                console.error('Ошибка при обновлении товара:', error);
                toast.error('Ошибка при обновлении товара');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "brand") {
            const selectedBrand = brands.find(brand => brand.name === value);
            const brandId = selectedBrand ? parseInt(selectedBrand.id, 10) : '';
            console.log(brandId);
            setProduct(prevProduct => ({
                ...prevProduct,
                [name]: value,
                brandId: isNaN(brandId) ? "" : brandId
            }));
        } else if (name === "category") {
            const selectedCategory = categories.find(category => category.name === value);
            const categoryId = selectedCategory ? parseInt(selectedCategory.id, 10) : '';
            console.log(categoryId);
            setProduct(prevProduct => ({
                ...prevProduct,
                [name]: value,
                categoryId: isNaN(categoryId) ? "" : categoryId
            }));
        } else {
            setProduct(prevProduct => ({
                ...prevProduct,
                [name]: value
            }));
        }
    };
    return (
        <div className={styles.content}>
            <div className={styles.title}>Изменить товар</div>
            <form className={styles.editForm} onSubmit={handleSubmit}>
                <div className={styles.edit}>
                    <div className={styles.text}>Название:</div>
                    <input
                        type="text"
                        className={styles.name}
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.edit}>
                    <div className={styles.text}>Описание:</div>
                    <textarea
                        className={styles.description}
                        name="description"
                        value={product.description}
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
                                value={product.country}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.edit}>
                            <div className={styles.text}>Предназначение:</div>
                            <textarea
                                className={styles.editDestiny}
                                name="purpose"
                                value={product.purpose}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className={styles.edit}>
                            <div className={styles.text}>Бренд:</div>
                            <select
                                className={styles.selectBrand}
                                name="brand"
                                value={product.brand.name}
                                onChange={handleChange}
                            >
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.name}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.edit}>
                            <div className={styles.text}>Категория:</div>
                            <select
                                className={styles.selectCategories}
                                name="category"
                                value={product.category.name}
                                onChange={handleChange}
                            >
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>
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
                                value={product.article}
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
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.edit}>
                    <div className={styles.text}>Количество:</div>
                    <input
                        type="number"
                        className={styles.quantity}
                        name="quantity_product"
                        value={product.quantity_product}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.edit}>
                    <div className={styles.text}>Изображение:</div>
                    <input type="file" className={styles.img} onChange={handleFileChange} />
                    {currentImage && (
                        <img
                            src={`${process.env.API_BASE_URL}/images/${currentImage}`}
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
