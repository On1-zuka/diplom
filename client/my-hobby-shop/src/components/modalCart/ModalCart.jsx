import { useState } from 'react';
import styles from './ModalCart.module.css';

export default function ModalCart({ isOpen }) {
    return (
        <div>
            {isOpen && (
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.titleText}>Дорогой клиент, спасибо, что выбрали нас.</div>
                    <div className={styles.text}>На ваш email-адрес вскоре придет сообщение с подробной информацией. Также, в течение дня с вами свяжется наш оператор.</div>
                </div>
            )}
        </div>
    );
}