import React, { useState, useEffect, useCallback, useMemo } from 'react';
import visa from '../../assets/card/visa.png';
import master from '../../assets/card/master-card.png';
import CartProductCard from '../cartProductCard/CartProductCard';
import axios from 'axios';

import styles from './CartPage.module.css';

export default function CartPage() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [productCard, setProductCard] = useState([]);
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    const handleDivClickPay = useCallback((method) => {
        setSelectedPaymentMethod(method);
    }, []);

    const handleDivClickDelivery = useCallback((method) => {
        setSelectedDeliveryMethod(method);
    }, []);

    const [userData, setUserData] = useState({
        id: '',
        login: '',
        email: '',
        name: '',
        surname: '',
        patronymic: '',
        phone: '',
        address: ''
    });

    const handleUserDataChange = (field, value) => {
        setUserData({ ...userData, [field]: value });
    };

    const handlePayment = () => {
        if (selectedPaymentMethod === 'receipt') {
        } else if (selectedPaymentMethod === 'card') {
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/users/profile`, {
                    withCredentials: true,
                });
                const user = response.data.user;
                setUserData({
                    id: user.id,
                    login: user.login,
                    email: user.email,
                    name: user.name,
                    surname: user.surname,
                    patronymic: user.patronymic,
                    phone: user.phone,
                    address: user.address
                });
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
            }
        };
        fetchData();
    }, []);

    const updateProductList = useCallback((productId) => {
        setProductCard(prevProducts => prevProducts.filter(product => product.id !== productId));
    }, []);

    const calculateTotalPrice = useMemo(() => {
        let totalPrice = 0;
        productCard.forEach((product) => {
            totalPrice += product.price_cart;
        });
        return totalPrice;
    }, [productCard]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/cart`, { withCredentials: true });
                setProductCard(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        setTotalPrice(calculateTotalPrice);
    }, [calculateTotalPrice]);

    return (
        <div className={styles.dataMenu}>
            <div className={styles.headerDataMenu}>
                <div className={styles.cart}>Корзина</div>
            </div>
            <div className={styles.pointsShop}>
                <div className={styles.pointOne}>
                    <div className={styles.titlePoint}>1. Обзор товара</div>
                    <div className={styles.itemsReview}>
                        {productCard.map((product) => (
                            <CartProductCard key={product.id}
                                product={product}
                                productId={product.id}
                                calculateTotalPrice={calculateTotalPrice}
                                updateProductList={updateProductList} />
                        ))}
                    </div>
                    <div className={styles.priceProduct}>Обшая сумма товаров: <span>{totalPrice} р</span></div>
                </div>
                <form action='' className={styles.userData}>
                    <div className={styles.pointTwo}>
                        <div className={styles.titlePoint}>2. Данные для доставки</div>
                        <div className={styles.viewingUserDate}>
                            <div className={styles.inputBox}>
                                <p>Имя</p>
                                <input type="text" placeholder="Имя" value={userData.name} readOnly
                                onChange={(e) => handleUserDataChange('name', e.target.value)} />
                            </div>
                            <div className={styles.inputBox}>
                                <p>Фамилия</p>
                                <input type="text" placeholder="Фамилия" value={userData.surname} readOnly
                                onChange={(e) => handleUserDataChange('surname', e.target.value)} />
                            </div>
                            <div className={styles.inputBox}>
                                <p>Отчество</p>
                                <input type="text" placeholder="Отчество" value={userData.patronymic} readOnly
                                onChange={(e) => handleUserDataChange('patronymic', e.target.value)} />
                            </div>
                            <div className={styles.inputBox}>
                                <p>Номер телефона</p>
                                <input type="text" placeholder="Номер телефона" value={userData.phone} readOnly
                                onChange={(e) => handleUserDataChange('phone', e.target.value)} />
                            </div>
                            <div className={styles.inputBox}>
                                <p>Адрес</p>
                                <input type="text" placeholder="Адрес" value={userData.address} readOnly
                                onChange={(e) => handleUserDataChange('address', e.target.value)} />
                            </div>
                            <div className={styles.inputBox}>
                                <p>Email</p>
                                <input type="text" placeholder="Email" value={userData.email} readOnly
                                onChange={(e) => handleUserDataChange('email', e.target.value)} />
                            </div>
                        </div>
                        <div className={styles.forUser}>*Для редактирования данных, зайдите в профиль</div>
                    </div>
                    <div className={styles.titlePoint}>3. Способ доставки</div>
                    <div className={styles.pointHome}>
                        <div className={styles.choice}>
                            <input type="radio" className={styles.way}
                                name="deliveryMethod"
                                onClick={() => handleDivClickDelivery('courier')} />
                            Курьер доставит товар по вашему адресу
                        </div>
                        10.0 р
                    </div>
                    <div className={styles.pointShop}>
                        <div className={styles.choice}>
                            <input type="radio" className={styles.way}
                                name="deliveryMethod"
                                onClick={() => handleDivClickDelivery('pickup')} />
                            Забрать из магазина
                        </div>
                        Бесплатно
                    </div>
                    <div className={styles.four}>
                        <div className={styles.titlePoint}>4. Способ оплаты</div>
                        <div className={styles.payMethod}>
                            <div className={styles.payReceipt} onClick={() => handleDivClickPay('receipt')}>
                                <input type="radio" className={styles.way}
                                    name="paymentMethod" />
                                Оплата при получении
                            </div>
                            <div className={styles.payCard} onClick={() => handleDivClickPay('card')}>
                                <input type="radio" className={styles.way}
                                    name="paymentMethod" />
                                Оплата картой
                                <img src={visa} alt="Виза" className={styles.visaCard} />
                                <img src={master} alt="Мастер кард" className={styles.masterCard} />

                                <div className={styles.dataCart}>
                                    <div className={styles.inputBox}>
                                        <p>Номер карты</p>
                                        <input type="text" placeholder="0000 0000 0000 0000" />
                                    </div>
                                    <div className={styles.bottomCard}>
                                        <div className={styles.inputBoxDate}>
                                            <p>Дата</p>
                                            <input type="text" placeholder="00/00" />
                                        </div>
                                        <div className={styles.inputBoxCvc}>
                                            <p>CVC</p>
                                            <input type="text" placeholder="000" />
                                        </div>
                                    </div>
                                    <button className={styles.payButton} onClick={handlePayment}>Оплатить: {totalPrice.toFixed(2)} р</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
