import styles from "./Contacts.module.css"

export default function Contacts() {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <h1>Контакты</h1>
                <div className={styles.text}>
                    <p className={styles.deliveryText}> Телефон: +375 (44) 788 20 35</p>
                    <p className={styles.deliveryText}> Почта: kuleshilja@yandex.by</p>
                    <p className={styles.deliveryText}> <a href="https://t.me/On1_zuka" target="_blank" rel="noopener noreferrer">Телеграмм: +375 (44) 788 20 35</a></p>
                    <p className={styles.deliveryText}><a href="https://www.instagram.com/on1_zuka?igsh=MTJsYmE4Nzk1ZGQzaw==" target="_blank" rel="noopener noreferrer">Инстаграмм: On1_zuka</a> </p>
                </div>
            </div>
        </div>
    )
}