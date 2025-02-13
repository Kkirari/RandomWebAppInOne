import React from 'react';
import styles from './Page.module.css'; // นำเข้า CSS Modules

const Page: React.FC = () => {
    return (
        <div className={styles.container}>
            <p className={styles.message}>Can you be my Valentine? 😊</p>
            <p className={styles.message}>Look at your Right 👉🏻</p>
        </div>
    );
};

export default Page;