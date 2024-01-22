import styles from './HomePage.module.css'
import HomeSlider from '../homeSlider/HomeSlider'
import SliderProducts from '../sliderProducts/SliderProducts'


export default function HomePage(){
    return(
        <main className={styles.HomePage__main}>
            <div className={styles.container}>
                <section className={styles.main__slider}>
                    <HomeSlider/>
                </section>
                <section className={styles.main__product}>
                    {/* <SliderProducts/> */}
                </section>
                 
            </div>
        </main>
    )
}