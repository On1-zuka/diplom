import styles from './EditBrandForm.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import { useState, useEffect } from 'react';

export default function EditBrandsForm() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/brands`);
                setBrands(response.data);
            } catch (error) {
                toast.error(`Ошибка при получении данных: ${error.response?.data?.message || error.message}`);
            }
        };
        fetchData();
    }, []);

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
                                    {brand.name}
                                </td>
                                <td className={styles.delete}>
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