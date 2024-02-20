import styles from './BrandItem.module.css'

export default function BrandItem({card}){
    return(
        <div className={styles.brandItem}>
            <a href='' className={styles.brandItem__link}>
                <img src={card.body} alt="Бренды" className={styles.brandItem__img}/>
            </a>
        </div>
    )
}