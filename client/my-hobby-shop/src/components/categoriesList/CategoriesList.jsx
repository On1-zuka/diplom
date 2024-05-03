import axios from 'axios';
import CategoriesItem from '../../common/categories/СategoriesItem';
import styles from './CategoriesList.module.css';
import { useState, useEffect } from 'react';

export default function CategoriesList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/categories');
                const sortedCategory = response.data.sort((a, b) => a.id - b.id).slice(0, 8);
                setCategories(sortedCategory); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.categoriesList}>
            {categories && categories.length > 0 ? (
                categories.map((category) => <CategoriesItem key={category.id} category={category} />)
            ) : (
                <p>No categories found.</p>
            )}
        </div>
    );
}
