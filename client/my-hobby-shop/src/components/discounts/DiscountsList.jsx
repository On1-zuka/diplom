import { useState } from 'react'
import styles from '../discounts/DiscountsList.module.css'
import img1 from '../../assets/Categories/akci.jpg'
import DiscountsItem from '../../common/discounts/DiscountsItem'


export default function DiscountsList() {

    const [discounts, setDiscounts] = useState([
        { id: 1, img: img1 },
        { id: 2, img: img1 },
        { id: 3, img: img1 },
        { id: 4, img: img1 }
    ])

    return (
        <div className={styles.discountsList}>
            {discounts.map((card)=>
                <DiscountsItem  card={card} key={card.id}/>
            )}
        </div>
    )
}