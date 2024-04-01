import styles from './HomeSlider.module.css';
import ph1 from "../../assets/slaider/1.jpg";
import ph2 from "../../assets/slaider/2.jpg";
import ph3 from "../../assets/slaider/3.jpg";
import LeftSlider from '../../common/leftSlider/LeftSlider';
import RightSlider from '../../common/rightSlider/RightSlider';
import Carousel from 'nuka-carousel';


export default function HomeSlider() {

  const image = [
    ph1, ph2, ph3
  ]

  return (
    <Carousel
      className={styles.slider}
      autoplay={true}
      wrapAround={true}
      cellSpacing={0}
      speed={1500}
      autoplayInterval={10000}
      defaultControlsConfig={{
        pagingDotsStyle: {
          width: '13px',
          height: '13px',
          borderRadius: '50%',
          margin: '0px 20px',
          fill: "orange",
          textAlign:'center',
          backgroundColor:'orange'
        },
      }}
      renderCenterLeftControls={({ previousSlide }) => <LeftSlider onClick={previousSlide} />}
      renderCenterRightControls={({ nextSlide }) => <RightSlider onClick={nextSlide} />}
    >
      {image.map((image, index) => (
        <img key={index} src={image} alt="Слайдер" />
      ))}
    </Carousel>
  );
}
