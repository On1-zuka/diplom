import styles from './HomePage.module.css'
import HomeSlider from '../homeSlider/HomeSlider'
import SliderProducts from '../sliderProducts/SliderProducts'
import CategoriesList from '../categoriesList/CategoriesList'
import BradsList from '../brandsList/BrandsList'
import DiscountsList from '../discounts/DiscountsList'

export default function HomePage() {
    return (
        <main className={styles.HomePage__main}>
            <div className={styles.container}>
                <section className={styles.main__slider}>
                    <HomeSlider />
                </section>
                <section className={styles.main__product}>
                    {/* <SliderProducts/> */}
                </section>
                <section className={styles.main__categories}>
                    <h2 className={styles.title}>Популярные категории</h2>
                    <CategoriesList />
                </section>
                <section className={styles.main__brands}>
                    <div className={styles.titleAndLink}>
                        <h2 className={styles.title}>Бренды</h2>
                        <a className={styles.titleAndLink} href="#">Смотреть все</a>
                    </div>
                    <BradsList/>
                </section>
                <section className={styles.main__discounts}>
                    <div className={styles.titleAndLink}>
                        <h2 className={styles.title}>Скидки</h2>
                        <a className={styles.titleAndLink} href="#">Смотреть все</a>
                    </div>
                    <DiscountsList/>
                </section>
            </div>
        </main>
    )
}