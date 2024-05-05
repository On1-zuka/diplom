import styles from './CartProductCard.module.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function CartProductCard({ product, productId, updateProductList}) {
    const [showToast, setShowToast] = useState(false);

    const handleDeleteWrapper = (productId) => {
        return () => {
            axios.delete(`${process.env.API_BASE_URL}/cart/remove/${product.productId}`, {
                withCredentials: true,
            })
                .then(response => {
                    setShowToast(true);
                    toast.success("Товар успешно удален из корзины");
                    updateProductList(productId);
                    calculateTotalPrice();
                })
                .catch(error => {
                    setShowToast(false);
                    toast.error("Упс, что-то пошло не так");
                });
        };

    };
    return (
        <form action="" className={styles.formCard}>
            <div className={styles.imgProductCard}>
                <img src={`${process.env.API_BASE_URL}/images/${product.product.img}`} alt="товар" />
            </div>
            <div className={styles.middleCard}>
                <div className={styles.upperCard}>
                    <div className={styles.titleCard}>{product.product.name}</div>
                    <FavoriteBorderIcon className={styles.favorite} />
                </div>
                <div className={styles.bottomCard}>
                    <div className={styles.quantityChanges}>
                        <button
                            className={styles.customLeftArrow}
                        >
                            {<RemoveIcon sx={{ fontSize: 24 }} />}
                        </button>
                        <input type="number"
                            value={product.quantity}
                            className={styles.inputBar} readOnly />
                        <button
                            className={styles.customLeftArrow}

                        >
                            {<AddIcon sx={{ fontSize: 24 }} />}
                        </button>
                    </div>
                    <div className={styles.price}>{product.price_cart}<span> р.</span></div>
                    <DeleteIcon className={styles.delete} onClick={handleDeleteWrapper(productId)} />
                </div>
            </div>
            <ToastContainer />
        </form>
    )
}