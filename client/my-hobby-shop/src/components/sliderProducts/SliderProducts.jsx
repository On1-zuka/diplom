import ProductCard from "../productCard/ProductCard";
import styles from './SliderProducts.module.css';
import LeftSlider from '../../common/leftSlider/LeftSlider';
import RightSlider from '../../common/rightSlider/RightSlider';
import { useState } from "react";
import Carousel from "nuka-carousel";


export default function SliderProducts() {

  const [card, setCard] = useState([
    { id:1, name: 'Товар 1', price: '100р.', image: '../../assets/product/tovar.png' },
    { id:2, name: 'Товар 1', price: '100р.', image: '../../assets/product/tovar.png' },
    { id:3, name: 'Товар 1', price: '100р.', image: '../../assets/product/tovar.png' },
    { id:4, name: 'Товар 1', price: '100р.', image: '../../assets/product/tovar.png' },
    { id:1, name: 'Товар 1', price: '100р.', image: '../../assets/product/tovar.png' },
    { id:2, name: 'Товар 1', price: '100р.', image: '../../assets/product/tovar.png' },
    { id:3, name: 'Товар 1', price: '100р.', image: '../../assets/product/tovar.png' },
    { id:4, name: 'Товар 1', price: '100р.', image: '../../assets/product/tovar.png' }
  ])

  return (
    <Carousel className={styles.slider}
      slidesToShow={1}
      wrapAround={true}
      cellSpacing={40}
      speed={1500}
      renderCenterLeftControls={({ previousSlide }) => <LeftSlider onClick={previousSlide} />}
      renderCenterRightControls={({ nextSlide }) => <RightSlider onClick={nextSlide} />}
      defaultControlsConfig={{
        pagingDotsStyle: {
          display: 'none',
        },
      }}
    >
      {card.map((card)=>
        <ProductCard card={card} key={card.id}/>
      )}
    </Carousel>
  )
}