import ProductCard from "../productCard/ProductCard";
import styles from './SliderProducts.module.css';
import Carousel  from 'nuka-carousel';
import LeftSlider from '../../common/leftSlider/LeftSlider';
import RightSlider from '../../common/rightSlider/RightSlider';


export default function SliderProducts(){
  const cardsPerSlide = 5;

    let ArrayCard = [
      { name: 'Товар 1', price: '100р.', image: '../../assets/product/tovar.png' },
      { name: 'Товар 1', price: '100р.', image: '../../assets/product/tovar.png' },
      { name: 'Товар 1', price: '100р.', image: '../../assets/product/tovar.png' },
      { name: 'Товар 1', price: '100р.', image: '../../assets/product/tovar.png' },
      { name: 'Товар 1', price: '100р.', image: '../../assets/product/tovar.png' },
      { name: 'Товар 1', price: '100р.', image: '../../assets/product/tovar.png' },
      { name: 'Товар 1', price: '100р.', image: '../../assets/product/tovar.png' },
    ]

    const groupedCards = ArrayCard.reduce((acc, _, index) => {
      if (index % cardsPerSlide === 0) {
        acc.push(ArrayCard.slice(index, index + cardsPerSlide));
      }
      return acc;
    }, []);

    return(
        <Carousel className={styles.slider}
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
      {groupedCards.map((group, index) => (
        <div key={index}>
          {group.map((product, innerIndex) => (
            <ProductCard key={innerIndex} {...product} />
          ))}
        </div>
      ))}
        </Carousel>
    )
}