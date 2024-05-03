import styles from './CategoryPage.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import CategoriesItem from '../../common/categories/СategoriesItem';

export default function CategoryPage() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/categories');
                setCategories(response.data);
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
                    <h2 className={styles.title}>Все категории</h2>
                    <div className={styles.brandsAndCategoryList}>
                        {categories && categories.length > 0 ? (
                            categories.map((category) => <CategoriesItem key={category.id} category={category} />)
                        ) : (
                            <p>No categories found.</p>
                        )}
                    </div>

                </div>
            </section>
        </main>);
}