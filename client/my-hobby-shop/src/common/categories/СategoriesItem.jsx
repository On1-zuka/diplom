import styles from './СategoriesItem.module.css';
import { Link } from 'react-router-dom';

export default function CategoriesItem({ category }) {
    return (
            <div className={styles.categoriesItem_inner}>
                <h3 className={styles.categories_title}>{category.name}</h3>
                <img
                    className={styles.categories_img}
                    src={`http://localhost:5000/api/images/${category.img}`}
                    alt="категории"
                />
            </div>
    );
}
