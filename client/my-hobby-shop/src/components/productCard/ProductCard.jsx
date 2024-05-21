import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';

export default function ProductCard({product}){
    return(
        <div className={styles.productCard__block}>
            <div className={styles.productCard__block__gray}>
                <div className={styles.productCard__upper}>
                    <div className={styles.upper__img}>
                        <img src={`${process.env.API_BASE_URL}/images/${product.img}`} alt="Карточка товара" className={styles.productCard__img} />
                    </div>
                </div>
            </div>
            <div className={styles.productCard__bottom}>
                <Link to={`/product/${product.id}`} className={styles.productCard__title}>
                    <h4>{product.name}</h4>
                </Link>
                <div className={styles.productCard__price}>
                    {product.price} р.
                </div>

            </div>
        </div>
    )
}