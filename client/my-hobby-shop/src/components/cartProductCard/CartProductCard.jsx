import styles from './CartProductCard.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function CartProductCard({ product, productId, updateProductList, updateTotalPrice, onQuantityExceeded }) {
    const [showToast, setShowToast] = useState(false);
    const [inputQuantity, setInputQuantity] = useState(product.quantity);
    const [totalPrice, setTotalPrice] = useState((product.product.price * product.quantity).toFixed(2));
    const maxQuantity = product.product.quantity_product;
    const [displayQuantity, setDisplayQuantity] = useState(product.quantity);
    const [showQuantityMessage, setShowQuantityMessage] = useState(true);
    const [isQuantityExceeded, setIsQuantityExceeded] = useState(false);

    useEffect(() => {
        setTotalPrice((inputQuantity * product.product.price).toFixed(2));
    }, [inputQuantity, product.product.price]);

    useEffect(() => {
        if (product.quantity > maxQuantity) {
            calculateTotalPrice(maxQuantity);
        }
    }, [product.quantity, maxQuantity]);

    const handleDeleteWrapper = (productId) => {
        return () => {
            axios.delete(`${process.env.API_BASE_URL}/cart/remove/${product.productId}`, {
                withCredentials: true,
            })
                .then(response => {
                    setShowToast(true);
                    toast.success("Товар успешно удален из корзины");
                    updateProductList(productId);
                    calculateTotalPrice(inputQuantity);
                })
                .catch(error => {
                    setShowToast(false);
                    toast.error("Упс, что-то пошло не так");
                });
        };
    };

    const handleIncrement = () => {
        if (inputQuantity < maxQuantity) {
            const newQuantity = inputQuantity + 1;
            updateQuantityOnServer(newQuantity);
            setInputQuantity(newQuantity);
            setDisplayQuantity(newQuantity);
            calculateTotalPrice(newQuantity);
            updateTotalPrice(prevTotalPrice => prevTotalPrice + product.product.price);
        } else {
            toast.error(`Максимально доступное количество товара: ${maxQuantity}`);
        }
    };

    const handleDecrement = () => {
        if (inputQuantity > 1) {
            const newQuantity = inputQuantity - 1;
            updateQuantityOnServer(newQuantity);
            setInputQuantity(newQuantity);
            setDisplayQuantity(newQuantity);
            calculateTotalPrice(newQuantity);
            updateTotalPrice(prevTotalPrice => prevTotalPrice - product.product.price);
            if (newQuantity < maxQuantity) {
                setDisplayQuantity(newQuantity);
            }
            if (newQuantity < product.product.quantity_product) {
                setShowQuantityMessage(false);
            }
        }
    };

    const calculateTotalPrice = (newQuantity) => {
        const newTotalPrice = (product.product.price * newQuantity).toFixed(2);
        setTotalPrice(newTotalPrice);
    };

    const handleChangeQuantity = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            const newValue = value === '' ? '' : Math.min(parseInt(value), product.product.quantity);
            if (newValue > 0 && newValue <= maxQuantity) {
                setInputQuantity(newValue);
                setDisplayQuantity(newValue);
                calculateTotalPrice(newValue);
                updateTotalPrice(product.product.price * newValue);
            } else if (newValue > maxQuantity) {
                toast.error(`Максимально доступное количество товара: ${maxQuantity}`);
            }
        }
    };

    const updateQuantityOnServer = (newQuantity) => {
        axios.patch(`${process.env.API_BASE_URL}/cart/update/${product.productId}`, {
            quantity: Number(newQuantity),
        }, {
            withCredentials: true,
        })
    };

    useEffect(() => {
        if (inputQuantity > maxQuantity) {
            setIsQuantityExceeded(true);
            onQuantityExceeded(true);
        } else {
            setIsQuantityExceeded(false);
            onQuantityExceeded(false);
        }
    }, [inputQuantity, maxQuantity, onQuantityExceeded]);

    return (
        <form action="" className={styles.formCard}>
            <div className={styles.imgProductCard}>
                <img src={`${process.env.API_BASE_URL}/images/${product.product.img}`} alt="товар" />
            </div>
            <div className={styles.middleCard}>
                <div className={styles.upperCard}>
                    <Link to={`/menu/cart/product/${product.product.id}`} className={styles.titleCard}>
                        <p className={styles.titleText}>{product.product.name}</p>
                    </Link>
                </div>
                {inputQuantity > maxQuantity && (
                    <div className={styles.quantity}>
                        <p>Кол-во товаров: {product.product.quantity_product}</p>
                    </div>
                )}
                <div className={styles.bottomCard}>
                    <div className={styles.quantityChanges}>
                        <button
                            type="button"
                            className={styles.customLeftArrow}
                            onClick={handleDecrement}
                        >
                            {<RemoveIcon sx={{ fontSize: 24 }} />}
                        </button>
                        <input
                            type="text"
                            value={displayQuantity}
                            onChange={handleChangeQuantity}
                            className={styles.inputBar}
                            style={{
                                WebkitAppearance: 'none',
                                margin: 0,
                            }}
                            maxLength={String(maxQuantity).length}
                        />
                        <button
                            type="button"
                            className={styles.customLeftArrow}
                            onClick={handleIncrement}
                        >
                            {<AddIcon sx={{ fontSize: 24 }} />}
                        </button>
                    </div>
                    <div className={styles.price}>{totalPrice}<span> р.</span></div>
                    <DeleteIcon className={styles.delete} onClick={handleDeleteWrapper(productId)} />
                </div>
            </div>
        </form>
    );
}
