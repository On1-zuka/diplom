import styles from "./LeftSlider.module.css";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


const LeftSlider = (props) => (
    <button
      onClick={props.previousSlide}
      className={styles.customLeftArrow}
    >
      {<ChevronLeftIcon sx={{ fontSize: 35}}/> }
      </button>
    );
    
export default LeftSlider;