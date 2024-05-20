import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BrandItem from '../../common/brand/BrandItem';
import styles from './BrandsPage.module.css';

export default function BrandsPage() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/brands`);
                setBrands(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleBrandClick = (brandId) => {
        console.log('Clicked on brand with ID:', brandId);
    };

    return (
        <main className={styles.main}>
            <section className={styles.sectionForm}>
                <div className={styles.container}>
                    <h2 className={styles.title}>Все бренды</h2>
                    <div className={styles.brandsAndCategoryList}>
                        {brands && brands.length > 0 ? (
                            brands.map((brand) => (
                                <BrandItem key={brand.id} brand={brand} onClick={handleBrandClick} />
                            ))
                        ) : (
                            <p>No brands found.</p>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
