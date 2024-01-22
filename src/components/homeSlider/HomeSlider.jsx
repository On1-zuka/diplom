import React from 'react';
import styles from './HomeSlider.module.css';
import Carousel  from 'nuka-carousel';
import ph1 from "../../assets/slaider/1.jpg";
import ph2 from "../../assets/slaider/2.jpg";
import ph3 from "../../assets/slaider/3.jpg";
import LeftSlider from '../../common/leftSlider/LeftSlider';
import RightSlider from '../../common/rightSlider/RightSlider';


export default function HomeSlider() {

  const imageSlider = [
    ph1, ph2, ph3
  ];

  return (
    <Carousel className={styles.slider}
    autoplay={true}
    wrapAround={true}
    cellSpacing={0}
    speed={1500}
    autoplayInterval={10000}
    renderCenterLeftControls={({ previousSlide }) => (
      <LeftSlider previousSlide={previousSlide}  />
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
    }}>
    <img src={ph1} alt="Картинка1" />
    <img src={ph2} alt="Картинка2" />
    <img src={ph3} alt="Картинка3" />
    </Carousel>
  );
}
