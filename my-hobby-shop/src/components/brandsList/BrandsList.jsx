import BrandItem from '../../common/brand/BrandItem'
import img1 from '../../assets/brand/1.png'
import img2 from '../../assets/brand/2.png'
import img3 from '../../assets/brand/3.png'
import img4 from '../../assets/brand/4.png'
import img5 from '../../assets/brand/5.png'
import img6 from '../../assets/brand/6.png'
import img7 from '../../assets/brand/7.png'
import img8 from '../../assets/brand/8.png'
import styles from '../brandsList/BrandsList.module.css'
import { useState } from 'react'

export default function BradsList() {

    const [brands, setBrands] = useState([
        { id: 1, body: img1 },
        { id: 2, body: img2 },
        { id: 3, body: img3 },
        { id: 4, body: img4 },
        { id: 5, body: img5 },
        { id: 6, body: img6 },
        { id: 7, body: img7 },
        { id: 8, body: img8 },
    ])

    return (
        <div className={styles.brandsList}>
            {brands.map((card) =>
                <BrandItem card={card} key={card.id} />
            )}
        </div>
    )
}