import ProductCard from "../productCard/ProductCard";
import styles from './SliderProducts.module.css';
import LeftSlider from '../../common/leftSlider/LeftSlider';
import RightSlider from '../../common/rightSlider/RightSlider';
import { useState, useEffect } from "react";
import Carousel from "nuka-carousel";
import axios from "axios";


export default function SliderProducts() {

  const [productCard, setProductCard] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.API_BASE_URL}/products`);
        setProductCard(response.data.rows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
    {productCard.map((product) =>
      <ProductCard key={product.id} product={product} />
    )}
  </Carousel>
)
}