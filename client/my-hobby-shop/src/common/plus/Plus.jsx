import styles from './Plus.module.css'
import AddIcon from '@mui/icons-material/Add';

export default function Plus({onClick}){
    return(
        <button
      onClick={onClick}
      className={styles.customLeftArrow}
    >
      {<AddIcon sx={{ fontSize: 35}}/> }
      </button>
    );
}