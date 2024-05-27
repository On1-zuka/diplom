import styles from './Pay.module.css'

export default function Pay() {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <h1>Оплата</h1>
                <br />
                <h2>Оплата наличными и картой в магазине</h2>
                <div className={styles.text}>
                    <p className={styles.deliveryText}>Оплата наличными и картой при получении самостоятельно из магазинов "MyHobby" при наличии товара в этом магазине.</p>
                </div>
                <h2>Оплата наличными курьеру</h2>
                <div className={styles.text}>
                    <p className={styles.deliveryText}>Вы оплачиваете заказ наличными курьеру. Вместе с заказом Вы получаете чек, содержащий все товарные позиции вашего заказа.</p>
                </div>
                <h2>Оплата картой курьеру</h2>
                <div className={styles.text}>
                    <p className={styles.deliveryText}>Вы оплачиваете заказ картой курьеру. Вместе с заказом Вы получаете чек, содержащий все товарные позиции вашего заказа.</p>
                </div>
            </div>
        </div>

    )
}