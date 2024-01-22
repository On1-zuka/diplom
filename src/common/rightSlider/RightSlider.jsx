import styles from "./RightSlider.module.css"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const RightSlider = (props) => (
    <button
      onClick={props.nextSlide}
      className={styles.customRightArrow}
    >
      {<ChevronRightIcon sx={{ fontSize: 35}}/> }
      </button>
    );
    
export default RightSlider;