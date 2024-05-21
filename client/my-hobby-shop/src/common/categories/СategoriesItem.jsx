import styles from './СategoriesItem.module.css';
import { Link } from 'react-router-dom';

export default function CategoriesItem({ category }) {
    return (
            <Link to={`/categories/catalog/${category.id}`} className={styles.categoriesItem_inner}>
                <h3 className={styles.categories_title}>{category.name}</h3>
                <img
                    className={styles.categories_img}
                    src={`${process.env.API_BASE_URL}/images/${category.img}`}
                    alt="категории"
                />
            </Link>
    );
}
