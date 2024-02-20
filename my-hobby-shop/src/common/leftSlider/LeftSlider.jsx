import styles from "./LeftSlider.module.css";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


const LeftSlider = ({onClick}) => (
    <button
      onClick={onClick}
      className={styles.customLeftArrow}
    >
      {<ChevronLeftIcon sx={{ fontSize: 35}}/> }
      </button>
    );
    
export default LeftSlider;