import React, { useEffect, useState } from "react";
import styles from "./OrderForm.module.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OrderForm() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/order/cart`);
            setOrders(response.data);
        } catch (error) {
            toast.error('Ошибка при получении заказов');
            console.error('Error fetching orders', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleSend = async (order) => {
        try {
            await axios.put(`${process.env.API_BASE_URL}/order/order-status/${order.id}`, { status: 1 });

            const emailContent = order.pickup 
            ? `<p>Уважаемый(ая) ${order.user.name}, ваш заказ готов к самовывозу. Пожалуйста, приходите в наш магазин, чтобы забрать его.</p>` 
            : `<p>Уважаемый(ая) ${order.user.name}, ваш заказ собран и будет доставлен на ваш адрес. Ожидаемая дата доставки: ${order.orderDate}.</p>`;

            await axios.post(`${process.env.API_BASE_URL}/email/send-email-user`, {
                to: order.user.email,
                subject: 'Статус вашего заказа',
                html: emailContent,
            });

            toast.success('Статус заказа обновлен и письмо отправлено');
            await fetchOrders();
        } catch (error) {
            toast.error('Ошибка при обновлении статуса или отправке письма');
            console.error('Error updating order status or sending email', error);
        }
    };

    return (
        <div className={styles.content}>
            <div className={styles.title}>Заказы</div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ФИО</th>
                            <th>Почта</th>
                            <th>Тип доставки</th>
                            <th>Дата</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td className={styles.name}>{`${order.user.surname} ${order.user.name} ${order.user.patronymic}`}</td>
                                <td className={styles.email}>
                                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                </td>
                                <td className={styles.orderPlace}>{order.pickup ? 'Самовывоз' : 'Доставка'}</td>
                                <td className={styles.orderDate}>{order.orderDate}</td>
                                <td className={styles.send}>
                                    <button 
                                        className={styles.button} 
                                        onClick={() => handleSend(order)}
                                    >
                                        Отправить
                                    </button>
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
