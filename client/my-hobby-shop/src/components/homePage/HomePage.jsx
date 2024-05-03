import styles from './HomePage.module.css'
import HomeSlider from '../homeSlider/HomeSlider'
import SliderProducts from '../sliderProducts/SliderProducts'
import CategoriesList from '../categoriesList/CategoriesList'
import BrandsList from '../brandsList/BrandsList'
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    return (
        <main className={styles.HomePage__main}>
            <div className={styles.container}>
                <section className={styles.main__slider}>
                    <HomeSlider />
                </section>
                <section className={styles.main__product}>
                    <div className={styles.titleAndLink}>
                        <h2 className={styles.title}>Товар дня</h2>
                        <a className={styles.link} onClick={() => navigate('/catalog')}>Смотреть все</a>
                    </div>
                    <SliderProducts />
                </section>
                <section className={styles.main__categories}>
                    <div className={styles.titleAndLink}>
                        <h2 className={styles.title}>Категории</h2>
                        <a className={styles.link} onClick={() => navigate('/categories')}>Смотреть все</a>
                    </div>
                    <CategoriesList />
                </section>
                <section className={styles.main__brands}>
                    <div className={styles.titleAndLink}>
                        <h2 className={styles.title}>Бренды</h2>
                        <a className={styles.link} onClick={() => navigate('/brands')}>Смотреть все</a>
                    </div>
                    <BrandsList />
                </section>
            </div>
        </main>
    )
}