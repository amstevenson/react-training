import React from 'react';
import styles from './toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from './DrawerToggle/DrawerToggle'

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <DrawerToggle toggleMenu={props.toggleMenu}/>
        <div className={styles.Logo}>
            <Logo />
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;