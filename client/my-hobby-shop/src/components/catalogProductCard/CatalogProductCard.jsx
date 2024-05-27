import { Link } from 'react-router-dom';
import styles from './CatalogProductCard.module.css';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export default function CatalogProductCard({ product }) {
    const [availability, setAvailability] = useState('');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (product.quantity_product > 0) {
            setAvailability('В наличии');
        } else {
            setAvailability('Нет в наличии');
        }
    }, [product]);

    const handleAddToCart = () => {
        const data = {
            productId: product.id,
            quantity: 1,
        };

        axios.post(`${process.env.API_BASE_URL}/cart/add`, data, { withCredentials: true })
            .then(response => {
                setShowToast(true);
                toast.success("Товар успешно добавлен в корзину");
            })
            .catch(error => {
                setShowToast(false);
                toast.error("Упс, что-то пошло не так.\n Проверьте, вы авторизованы.\n Если не помогло, то напишите нам!");
            });
    }
    return (
        <div className={styles.productCardBlock}>
            <div className={styles.imgCard}>
                <img src={`${process.env.API_BASE_URL}/images/${product.img}`} alt="Картинка товара" className={styles.productCardImg} />
            </div>
            <div className={styles.content}>
                <div className={styles.availability}>
                    {availability === 'В наличии' ? (
                        <div className={styles.checkProduct}><CheckIcon />{availability}</div>
                    ) : (
                        <div className={styles.closeProduct}><CloseIcon />{availability}</div>
                    )}
                </div>
                <Link to={`/catalog/product/${product.id}`} className={styles.nameProductLink}>
                    <p className={styles.nameProduct}>{product.name}</p>
                </Link>
                <p className={styles.descriptionProduct}>{product.description}</p>
            </div>
            <div className={styles.priceAndButton}>
                <p>{product.price} р.</p>
                <button type="button" className={`${styles.cart} ${product.quantity_product <= 0 ? styles.disabledButton : ''}`}
                    disabled={product.quantity_product <= 0} onClick={handleAddToCart}>
                    В корзину
                </button>
                
            </div>
        </div>
    );
}
