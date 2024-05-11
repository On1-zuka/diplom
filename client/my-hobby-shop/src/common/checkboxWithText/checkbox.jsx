import React, { useState } from 'react';
import styles from './checkbox.module.css';

const Checkbox = ({ label, value, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onChange(value);
  };

  return (
    <div className={styles.checkboxItem}>
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      <span>{label}</span>
    </div>
  );
};

export default Checkbox;
