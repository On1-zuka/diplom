import React, { useEffect, useState } from "react";
import styles from "./OrderForm.module.css";
import axios from "axios";

export default function OrderForm() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/order/cart`);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders', error);
            }
        }
        fetchOrders();
    }, []);

    return (
        <div className={styles.content}>
            <div className={styles.title}>Заказы</div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ФИО</th>
                            <th>Тип доставки</th>
                            <th>Дата</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td className={styles.name}>{`${order.user.surname} ${order.user.name} ${order.user.patronymic}`}</td>
                                <td className={styles.orderPlace}>{order.pickup}</td>
                                <td className={styles.orderDate}>{order.orderDate}</td>
                                <td className={styles.send}>
                                    <button className={styles.button}>Отправить</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
