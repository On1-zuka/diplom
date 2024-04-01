import CategoriesItem from '../../common/categories/СategoriesItem'
import img1 from '../../assets/Categories/sewing.png'
import img2 from '../../assets/Categories/artist.png'
import img3 from '../../assets/Categories/bisser.png'
import img4 from '../../assets/Categories/kniting.png'
import img5 from '../../assets/Categories/origami.png'
import img6 from '../../assets/Categories/weaving.png'
import img7 from '../../assets/Categories/model.png'
import img8 from '../../assets/Categories/burning.png'
import styles from './CategoriesList.module.css'
import { useState } from 'react'

export default function CategoriesList() {
    
    const [categories, setCategories] = useState([
        { id: 1, title: 'Шитье', body: img1, link: 'products/shitie'}, 
        { id: 2, title: 'Рисование', body: img2 },
        { id: 3, title: 'Биссероплетение', body: img3 },
        { id: 4, title: 'Вязание', body: img4 },
        { id: 5, title: 'Оригами', body: img5 },
        { id: 6, title: 'Плетение', body: img6 },
        { id: 7, title: 'Моделирование', body: img7 },
        { id: 8, title: 'Выжигание по дереву', body: img8 },
    ])

    return (
        <div className={styles.categoriesList}>
            {categories.map((card) =>
                <CategoriesItem card={card} key={card.id} />
            )}
        </div>
    )
}