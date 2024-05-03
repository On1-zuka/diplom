import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CatalogProductCard.module.css';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState, useEffect } from 'react';

export default function CatalogProductCard({ product, onClick}) {
    const [availability, setAvailability] = useState('');

    useEffect(() => {
        if (product.quantity_product > 0) {
            setAvailability('В наличии');
        } else {
            setAvailability('Нет в наличии');
        }
    }, [product.quantity_product]);

    return (
        <div className={styles.productCardBlock}>
            <div className={styles.imgCard}>
                <img src={`http://localhost:5000/api/images/${product.img}`} alt="Картинка товара" className={styles.productCardImg} />
            </div>
            <div className={styles.content}>
                <div className={styles.availability}>
                    {availability === 'В наличии' ? (
                        <div className={styles.checkProduct}><CheckIcon />{availability}</div>
                    ) : (
                        <div className={styles.closeProduct}><CloseIcon />{availability}</div>
                    )}
                    <div className={styles.favorite}>
                        <FavoriteBorderIcon className={styles.favoriteIcon}/> <span>В избранное</span>
                    </div>
                </div>
                <Link to={`/catalog/product/${product.id}`} className={styles.nameProductLink}>
                    <p className={styles.nameProduct}>{product.name}</p>
                </Link>
                <p className={styles.descriptionProduct}>{product.description}</p>
            </div>
            <div className={styles.priceAndButton}>
                <p>{product.price} р.</p>
                <button className={styles.cart}>В корзину</button>
            </div>
        </div>
    );
}
