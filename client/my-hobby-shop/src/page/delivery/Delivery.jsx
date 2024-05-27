import styles from './Delivery.module.css'

export default function Delivery() {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <h1>Доставка</h1>
                <div className={styles.text}>
                    <p className={styles.deliveryText}>Доставка осуществляется курьером по всем городам Беларуси</p>
                    <p>Стоимость доставки: 10 р.</p>
                    <p>Срок доставки 1-2 рабочих дня.</p>
                    <br />
                    <p>Также возможен самовывоз из магазинов MyHobby (стоимость - бесплатно):</p>
                    <br />
                    <p className={styles.last}>г. Минск, ул. Казинца 91</p>
                </div>
            </div>
        </div>

    )
}