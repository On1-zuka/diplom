import styles from './EditCategoriesForm.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function EditCategoriesForm() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/categories`);
                setCategories(response.data);
            } catch (error) {
                toast.error(`Ошибка при получении данных: ${error.response?.data?.message || error.message}`);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.API_BASE_URL}/categories/${id}`);
            setBrands(category.filter(category => category.id !== id));
        } catch (error) {
            toast.error(`Ошибка при удалении товара: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className={styles.content}>
            <div className={styles.title}>Изменение, удаление категории</div>
            <h2 className={styles.underTitle}>Категории</h2>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id} className={styles.lineTable}>
                                <td className={styles.nameBrands}>
                                    <Link to={`/admin/editCategories/category/${category.id}`}>
                                        {category.name}
                                    </Link>
                                </td>
                                <td className={styles.delete} onClick={() => handleDelete(category.id)}>
                                    <DeleteIcon />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}