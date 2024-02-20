import styles from '../discounts/DiscountsItems.module.css'

export default function DiscountsItem({card}){
    return (
        <div className={styles.discountsItem}>
            <img src={card.img} alt="Скидки"></img>
        </div>
    )
}