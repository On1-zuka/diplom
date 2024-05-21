import React, { useState, useEffect, useCallback, useMemo } from 'react';
import CartProductCard from '../cartProductCard/CartProductCard';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import styles from './CartPage.module.css';
import moment from 'moment';

export default function CartPage() {
    const [productCard, setProductCard] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [isChecked, setIsChecked] = useState(false);
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
    const [cartEmpty, setCartEmpty] = useState(true);

    const handleUserDataChange = (field, value) => {
        setUserData({ ...userData, [field]: value });
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
                setCartEmpty(response.data.length === 0);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);
    

    useEffect(() => {
        setTotalPrice(calculateTotalPrice);
    }, [calculateTotalPrice]);

    const handleDivClickDelivery = (method) => {
        setDeliveryMethod(method);
    };

    const handleDivClickPay = (method) => {
        setPaymentMethod(method);
    };

    const handleTimeChange = (timeString) => {
        setSelectedTime(timeString);
    };

    const handlePayment = async (event) => {
        event.preventDefault();
        if (deliveryMethod !== 'courier' && deliveryMethod !== 'pickup') {
            toast.error('Выберите способ доставки');
            return;
        }

        if (deliveryMethod === 'courier' && (!selectedDate || !selectedTime)) {
            toast.error('Выберите дату и время для доставки');
            return;
        }

        if (paymentMethod !== 'receipt' && paymentMethod !== 'card') {
            toast.error('Выберите способ оплаты');
            return;
        }

        const currentDate = moment();
        const orderDate = deliveryMethod === 'pickup' && !selectedDate ? currentDate.format('DD.MM.YYYY') : selectedDate;
        const orderTime = deliveryMethod === 'pickup' && !selectedTime ? currentDate.format('HH:mm') : selectedTime;

        const orderData = {
            orderDate,
            pickup: deliveryMethod === 'pickup',
            orderTime,
            finalPrice: totalPrice.toFixed(2),
            usePoints: isChecked
        };

        try {
            const response = await axios.post(`${process.env.API_BASE_URL}/order/create-order`, orderData, { withCredentials: true });
            console.log('Order submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    const getNextDay = () => {
        const currentDate = new Date();
        let nextDay = new Date(currentDate);
        nextDay.setDate(currentDate.getDate() + 1);
        if (nextDay.getDay() === 0) {
            nextDay.setDate(currentDate.getDate() + 2);
        }
        return nextDay.toISOString().split('T')[0];
    };

    const getNextFiveDays = () => {
        const currentDate = new Date();
        let nextFiveDays = new Date(currentDate);
        let count = 0;
        while (count < 5) {
            nextFiveDays.setDate(nextFiveDays.getDate() + 1);
            if (nextFiveDays.getDay() !== 0) {
                count++;
            }
        }
        return nextFiveDays.toISOString().split('T')[0];
    };

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className={styles.dataMenu}>
            <div className={styles.headerDataMenu}>
                <div className={styles.cart}>Корзина</div>
            </div>
            {cartEmpty ? (
                <div className={styles.cartEmpty}>Корзина пуста
                    <br />
                    <span>Загляните в каталог или воспользуйтесь поиском, чтобы найти нужные товары.</span></div>
            ) : (
                <div className={styles.pointsShop}>
                    <div className={styles.pointOne}>
                        <div className={styles.titlePoint}>1. Обзор товара</div>
                        <div className={styles.itemsReview}>
                            {productCard.map((product) => (
                                <CartProductCard key={product.id}
                                    product={{ ...product, price: product.product.price }}
                                    productId={product.id}
                                    updateProductList={updateProductList}
                                    updateTotalPrice={setTotalPrice}
                                />
                            ))}
                        </div>
                        <div className={styles.priceProduct}>Общая сумма товаров: <span>{totalPrice.toFixed(2)} р</span></div>
                    </div>

                    {!cartEmpty && (
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
                            <div className={styles.pointHome} onClick={() => handleDivClickDelivery('courier')}>
                                <div className={styles.choice}>
                                    <input type="radio" className={styles.way}
                                        name="deliveryMethod"
                                        checked={deliveryMethod === 'courier'}
                                        onChange={() => { }} />
                                    Курьер доставит товар по вашему адресу
                                    <div className={styles.dateTime}>
                                        <input
                                            type="date"
                                            className={styles.date}
                                            min={getNextDay()}
                                            max={getNextFiveDays()}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            onFocus={(e) => e.target.blur()}
                                        />
                                        <select value={selectedTime} onChange={(e) => handleTimeChange(e.target.value)} className={styles.time}>
                                            <option value="">Выберите время</option>
                                            <option value="C 10:00 до 11:00">C 10:00 до 11:00</option>
                                            <option value="C 11:00 до 12:00">C 11:00 до 12:00</option>
                                            <option value="C 12:00 до 13:00">C 12:00 до 13:00</option>
                                            <option value="C 14:00 до 15:00">C 14:00 до 15:00</option>
                                            <option value="C 15:00 до 16:00">C 15:00 до 16:00</option>
                                            <option value="C 16:00 до 17:00">C 16:00 до 17:00</option>
                                            <option value="C 17:00 до 18:00">C 17:00 до 18:00</option>
                                        </select>
                                    </div>
                                    10.0 р
                                </div>
                            </div>
                            <div className={styles.pointShop} onClick={() => handleDivClickDelivery('pickup')}>
                                <div className={styles.choice}>
                                    <input type="radio" className={styles.way}
                                        name="deliveryMethod"
                                        checked={deliveryMethod === 'pickup'}
                                        onChange={() => { }} />
                                    Забрать из магазина
                                </div>
                                Бесплатно
                            </div>
                            <div className={styles.titlePoint}>4. Способ оплаты</div>
                            <div className={styles.payMethod}>
                                <div className={styles.payReceipt} onClick={() => handleDivClickPay('receipt')}>
                                    <input type="radio" className={styles.way}
                                        name="paymentMethod"
                                        checked={paymentMethod === 'receipt'}
                                        onChange={() => { }} />
                                    Оплата наличными при получении
                                </div>
                                <div className={styles.payCard} onClick={() => handleDivClickPay('card')}>
                                    <input type="radio" className={styles.way}
                                        name="paymentMethod"
                                        checked={paymentMethod === 'card'}
                                        onChange={() => { }} />
                                    Оплата картой при получении
                                </div>
                            </div>
                            <div className={styles.titlePoint}>5. Оформление заказа</div>
                            <div className={styles.scoresBox}>
                                <button className={styles.payButton} onClick={handlePayment}>Завершить оформление</button>
                                <div className={styles.scores} onClick={handleToggle}>
                                    <input type="checkbox" className={styles.way} checked={isChecked} onChange={() => { }} />
                                    Использовать баллы?
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}
