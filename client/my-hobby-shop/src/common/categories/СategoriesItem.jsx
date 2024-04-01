import styles from './СategoriesItem.module.css'
import {Link} from "react-router-dom"; 


export default function Categories({card}) {
    
    return (
        <Link to = {card.link} className={styles.categoriesItem}>
                <div className={styles.categoriesItem_inner}>
                    <h3 className={styles.categories_title}>{card.title}</h3>
                    <img className={styles.categories_img} src={card.body} alt="Шитье" />
                </div>
        </Link>
    )
}