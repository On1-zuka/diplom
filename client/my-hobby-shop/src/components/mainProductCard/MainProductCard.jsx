import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MainProductCard.module.css';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Minus from '../../common/minus/Minus';
import Plus from '../../common/plus/Plus';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export default function MainProductCard() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [availability, setAvailability] = useState('');
    const [inputQuantity, setInputQuantity] = useState(1);
    const [maxQuantity, setMaxQuantity] = useState(product ? product.quantity_product : 1);
    const [totalPrice, setTotalPrice] = useState(product ? product.price : 0);
    const [showToast, setShowToast] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalCartQuantity, setTotalCartQuantity] = useState(0);
    
    const handleAddToCart = () => {
        const data = {
            productId: id,
            quantity: inputQuantity,
        };

        axios.post(`${process.env.API_BASE_URL}/cart/add`, data, { withCredentials: true })
            .then(response => {
                setShowToast(true);
                toast.success("Товар успешно добавлен в корзину");
                setCartItems(prevItems => [...prevItems, data]);
                setTotalCartQuantity(prevQuantity => prevQuantity + inputQuantity);
            })
            .catch(error => {
                console.error('Ошибка при добавлении товара в корзину:', error);
                setShowToast(false);
                toast.error("Упс, что-то пошло не так");
            });
    };

    useEffect(() => {
        axios.get(`${process.env.API_BASE_URL}/products/${id}`)
            .then(response => {
                setProduct(response.data);
                setTotalPrice(response.data.price);
                setMaxQuantity(response.data.quantity_product);
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
            });
    }, [id]);

    useEffect(() => {
        if (product && product.quantity_product > 0) {
            setAvailability('В наличии');
        } else {
            setAvailability('Нет в наличии');
        }
    }, [product]);

    const handleIncrement = () => {
        if (inputQuantity < maxQuantity) {
            setInputQuantity(prevQuantity => Math.min(prevQuantity + 1, maxQuantity));
            setTotalPrice(prevPrice => prevPrice + product.price);
        }
    };

    const handleDecrement = () => {
        if (inputQuantity > 1) {
            setInputQuantity(prevQuantity => prevQuantity - 1);
            setTotalPrice(prevPrice => prevPrice - product.price);
        }
    };

    const handleInputChange = (e) => {
        const newValue = parseInt(e.target.value);
        if (isNaN(newValue) || newValue <= 0) {
            return;
        }
        const updatedValue = Math.min(newValue, maxQuantity);
        setInputQuantity(updatedValue);
        setTotalPrice(updatedValue * product.price);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.productCard}>
                    <div className={styles.headerCard}>
                        <div className={styles.titleProduct}>{product.name}</div>
                    </div>
                    <div className={styles.contentProduct}>
                        <div className={styles.blockImgProduct}>
                            <img className={styles.imgProduct} src={`${process.env.API_BASE_URL}/images/${product.img}`} alt="Фото товара" />
                            <p className={styles.textProduct}>*Цвет на фото может незначительно отличаться</p>
                        </div>
                        <div className={styles.specificationsProduct}>
                            <div className={styles.availability}>
                                {availability === 'В наличии' ? (
                                    <div className={styles.checkProduct}><CheckIcon />{availability}</div>
                                ) : (
                                    <div className={styles.closeProduct}><CloseIcon />{availability}</div>
                                )}
                                <div className={styles.forever}><FavoriteBorderIcon /> В избранное</div>
                            </div>
                            <div className={styles.quantityProduct}>Количество товаров на складе: {product.quantity_product}</div>
                            <p className={styles.titleDescription}>Описание</p>
                            <div className={styles.descriptionProduct}>{product.description}</div>
                            <div className={styles.aboutProduct}>
                                <p className={styles.titleDescription}>О товаре</p>
                                <ul className={styles.listItem}>
                                    <li className={styles.listItemPoint}>Бренд: <span>{product.brand.name || 'Нет информации'}</span></li>
                                    <li className={styles.listItemPoint}>Страна производителя: <span>{product.country}</span></li>
                                    <li className={styles.listItemPoint}>Предназначение: <span>{product.purpose}</span></li>
                                    <li className={styles.listItemPoint}>Артикул: <span>{product.article}</span></li>
                                    <li className={styles.listItemPoint}>В наборе: <span>{product.set ? 'Да' : 'Нет'}</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.menuBuy}>
                            <div className={styles.priceProduct}>{totalPrice.toFixed(2)} р.</div>
                            <div className={styles.quantityChanges}>
                                <Minus onClick={handleDecrement} />
                                <input
                                    type="number"
                                    value={inputQuantity}
                                    onChange={handleInputChange}
                                    className={styles.inputMenuBar}
                                />
                                <Plus onClick={handleIncrement} />
                            </div>
                            <button className={`${styles.buttonCard}
                             ${product.quantity_product === 0 ? styles.disabledButton : ''}`}
                                disabled={product.quantity_product === 0}
                                onClick={() => {
                                    handleAddToCart();
                                    setShowToast(true);
                                }}>
                                В корзину
                            </button>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
