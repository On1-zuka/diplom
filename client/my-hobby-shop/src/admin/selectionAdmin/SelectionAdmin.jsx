import styles from './SelectionAdmin.module.css'
import {Link, Outlet, useNavigate} from "react-router-dom";

export default function SelectionAdmin(){
    const navigate = useNavigate();
    return(
        <div className={styles.main}>
        <section className={styles.selectionPage}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.controlMenu}>
                        <div className={styles.bottomMenu}>
                            <ul className={styles.listMenu}>
                                <li onClick={()=>navigate('/admin/editProducts')}>Изменение и удаление товаров </li>
                                <li onClick={()=>navigate('/admin/addProducts')}>Добавление товаров</li>
                                <li>Выход</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Outlet/>
            </div>
        </section>
    </div>
    )
}