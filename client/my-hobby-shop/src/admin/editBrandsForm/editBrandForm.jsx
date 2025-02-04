import styles from './EditBrandForm.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditBrandsForm() {
    const [brands, setBrands] = useState([]);

    const fetchBrands = async () => {
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/brands`);
            setBrands(response.data);
        } catch (error) {
            toast.error(`Ошибка при получении данных: ${error.response?.data?.message || error.message}`);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.API_BASE_URL}/brands/${id}`);
            toast.success('Бренд успешно удален');
            fetchBrands();
        } catch (error) {
            toast.error(`Ошибка при удалении бренда: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className={styles.content}>
            <div className={styles.title}>Изменение, удаление брендов</div>
            <h2 className={styles.underTitle}>Бренды</h2>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.map((brand) => (
                            <tr key={brand.id} className={styles.lineTable}>
                                <td className={styles.nameBrands}>
                                    <Link to={`/admin/editBrands/brand/${brand.id}`}>
                                        {brand.name}
                                    </Link>
                                </td>
                                <td className={styles.delete} onClick={() => handleDelete(brand.id)}>
                                    <DeleteIcon />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer position="top-right" />
        </div>
    );
}
