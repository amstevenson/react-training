import React from 'react';
import styles from './drawertoggle.module.css'

const drawerToggle = (props) => (
    <div className={styles.DrawerToggle} onClick={props.toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;