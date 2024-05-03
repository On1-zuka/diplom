import styles from './CartPage.module.css';
import { useEffect, useState } from 'react';
import visa from '../../assets/card/visa.png';
import master from '../../assets/card/master-card.png';
import CartProductCard from '../cartProductCard/CartProductCard';
import axios from 'axios';

export default function CartPage() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [productCard, setProductCard] = useState([]);
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('');


    const handleDivClickPay = (method) => {
        setSelectedPaymentMethod(method);
    };

    const handleDivClickDelivery = (method) => {
        setSelectedDeliveryMethod(method);
    };

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
                            <CartProductCard key={product.id} product={product} />
                        ))
                        }
                    </div>
                    <div className={styles.priceProduct}>Обшая сумма товаров: <span>123.7 р</span></div>
                </div>
                <form action='' className={styles.userData}>
                    <div className={styles.pointTwo}>
                        <div className={styles.titlePoint}>2. Данные для доставки</div>
                        <div className={styles.viewingUserDate}>
                            <div className={styles.inputBox}>
                                <p>Имя</p>
                                <input type="text" placeholder="Имя" readOnly />
                            </div>
                            <div className={styles.inputBox}>
                                <p>Фамилия</p>
                                <input type="text" placeholder="Фамилия" readOnly />
                            </div>
                            <div className={styles.inputBox}>
                                <p>Отчество</p>
                                <input type="text" placeholder="Отчество" readOnly />
                            </div>
                            <div className={styles.inputBox}>
                                <p>Номер телефона</p>
                                <input type="text" placeholder="Номер телефона" readOnly />
                            </div>
                            <div className={styles.inputBox}>
                                <p>Адрес</p>
                                <input type="text" placeholder="Адрес" readOnly />
                            </div>
                            <div className={styles.inputBox}>
                                <p>Email</p>
                                <input type="text" placeholder="Email" readOnly />
                            </div>
                        </div>
                        <div className={styles.forUser}>*Для редактирования данных, зайдите в профиль</div>
                    </div>
                    <div className={styles.titlePoint}>3. Способ доставки</div>
                    <div className={styles.pointHome}>
                        <div className={styles.choice}>
                            <input type="radio" className={styles.way}
                                name="deliveryMethod" />
                            Курьер доставит товар по вашему адресу
                        </div>
                        10.0 р
                    </div>
                    <div className={styles.pointShop}>
                        <div className={styles.choice}>
                            <input type="radio" className={styles.way}
                                name="deliveryMethod" />
                            Забрать из магазина
                        </div>
                        Бесплатно
                    </div>
                    <div className={styles.four}>
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
                                        <button className={styles.payButton}>Оплатить: 1231.43 р</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}