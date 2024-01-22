import styles from './ProductCard.module.css';
import imgeBlock from '../../assets/product/tovar.png';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function ProductCard(){
    return(
        <div className={styles.productCard__block}>
            <div className={styles.productCard__block__gray}>
                <div className={styles.rating}>
                    <div className={styles.rating__item}>★</div> 
                    <div className={styles.rating__item}>★</div>  
                    <div className={styles.rating__item}>★</div>
                    <div className={styles.rating__item}>★</div>
                    <div className={styles.rating__item}>★</div>
                </div>
                <div className={styles.productCard__upper}>
                    <div className={styles.upper__img}>
                        <img src={imgeBlock} alt="Карточка товара" className={styles.productCard__img} />
                    </div>
                    <div className={styles.upper__btn}>
                        <button className={styles.shopping}>
                            <AddShoppingCartIcon sx={{ fontSize: 20}}/>
                        </button>
                        <button className={styles.favorite} >
                            <FavoriteBorderIcon sx={{ fontSize: 20}}/>
                        </button>
                    </div>
                    
                </div>
            </div>
            <div className={styles.productCard__bottom}>
                <div className={styles.productCard__title}>
                    <h4>Набор карандашей (10 шт.)</h4>
                </div>
                <div className={styles.productCard__price}>
                    24р. 53к.
                </div>

            </div>
        </div>
    )
}