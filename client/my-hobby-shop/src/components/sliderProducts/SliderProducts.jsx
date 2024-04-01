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
  ])

  return (
    <Carousel className={styles.slider}
     slidesToShow={2}
      wrapAround={true}
      cellSpacing={0}
      speed={1500}
      renderCenterLeftControls={({ previousSlide }) => (
        <LeftSlider previousSlide={previousSlide} />
      )}
      renderCenterRightControls={({ nextSlide }) => (
        <RightSlider nextSlide={nextSlide} />
      )}
      defaultControlsConfig={{
        pagingDotsStyle: {
          width: '35px',
          height: '35px',
          margin: '0 4px',
          borderRadius: '50%',
          display: 'block',
        },
      }}
    >
      {card.map((card)=>
        <ProductCard card={card} key={card.id}/>
      )}
    </Carousel>
  )
}