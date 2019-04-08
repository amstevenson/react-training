import React from 'react';
import styles from './toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Menu from '../Toolbar/Menu/Menu'

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <Menu toggleMenu={props.toggleMenu}/>
        <div className={styles.Logo}>
            <Logo />
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;