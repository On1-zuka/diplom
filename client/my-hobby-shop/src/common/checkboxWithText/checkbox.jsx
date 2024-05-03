import styles from './checkbox.module.css';

const Checkbox = ({ label }) => {
  return (
    <div className={styles.checkboxItem}>
      <input type="checkbox" />
      <span>{label}</span>
    </div>
  );
};

export default Checkbox;