import styles from './BrandsPage.module.css'
import BrandItem from '../../common/brand/BrandItem';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function BrandsPage() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/brands');
                setBrands(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <main className={styles.main}>
            <section className={styles.sectionForm}>
                <div className={styles.container}>
                    <h2 className={styles.title}>Все бренды</h2>
                    <div className={styles.brandsAndCategoryList}>
                        {brands && brands.length > 0 ? (
                            brands.map((brand) => <BrandItem key={brand.id} brand={brand} />)
                        ) : (
                            <p>No brands found.</p>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}