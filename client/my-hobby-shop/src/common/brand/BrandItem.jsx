import styles from './BrandItem.module.css';

const BrandItem = ({ brand }) => {
    return (
        <div className={styles.brandItem}>
            <a href='#' className={styles.brandItem__link}>
            <img src={`http://localhost:5000/api/images/${brand.img}`} alt="картинка бренда" className={styles.brandItem__img}/>
            </a>
        </div>
    );
}

export default BrandItem;
