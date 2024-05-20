import React from 'react';
import styles from './BrandItem.module.css';
import { Link } from 'react-router-dom';

const BrandItem = ({ brand, onClick }) => {
    return (

            <Link to={`/brands/catalog/${brand.id}`} className={styles.brandItem}>
                <img src={`${process.env.API_BASE_URL}/images/${brand.img}`} alt="картинка бренда" className={styles.brandItem__img}/>
            </Link>
    );
}

export default BrandItem;
