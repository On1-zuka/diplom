import styles from './Minus.module.css'
import RemoveIcon from '@mui/icons-material/Remove';

export default function Minus({onClick}){
    return(
        <button
      onClick={onClick}
      className={styles.customLeftArrow}
    >
      {<RemoveIcon sx={{ fontSize: 35}}/> }
      </button>
    );
}