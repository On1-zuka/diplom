import { useEffect, useState } from 'react';
import styles from './EditProducts.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function EditProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/products`);
                const products = response.data.rows;
                const uniqueIds = new Set(products.map(product => product.id));
                if (uniqueIds.size !== products.length) {
                    console.error('Duplicate IDs found');
                }
                setProducts(products);
            } catch (error) {
                toast.error(`Ошибка при получении данных: ${error.response?.data?.message || error.message}`);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.API_BASE_URL}/products/${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            toast.error(`Ошибка при удалении товара: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className={styles.content}>
            <div className={styles.title}>Изменение, удаление товаров</div>
            <h2 className={styles.underTitle}>Товары</h2>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Кол-во</th>
                            <th>Цена</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className={styles.lineTable}>
                                <td className={styles.nameProducts}>
                                    <Link to={`/admin/editProducts/product/${product.id}`} className={styles.nameProductLink}>
                                        {product.name}
                                    </Link>
                                </td>
                                <td className={styles.quantityProducts}>{product.quantity_product}</td>
                                <td className={styles.priceProducts}>{product.price} <span>р.</span></td>
                                <td className={styles.delete} onClick={() => handleDelete(product.id)}>
                                    <DeleteIcon />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
