import React, { useEffect } from 'react';
import styles from './cockpit.module.css'

const cockpit = (props) => {

    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        // setTimeout(() => {
        //     alert('Saved data to the cloud!')
        // }, 1000);
        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');
        };
    }, [props.persons]);

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        };
    });

    const classes = [];
    let btnClass = '';

    if (props.showPersons){
        btnClass = styles.Red
    }

    if (props.persons.length <=2 ) {
      classes.push(styles.red); 
    } 
    if (props.persons.length <=1 ) {
      classes.push(styles.bold);
    }

    return (     
    <div className={styles.Cockpit}>   
        <h1>{props.title}</h1>
        <p className={classes.join(' ')}>Woo, an application made with React</p>
        <button 
        className={btnClass}
        onClick={props.clicked}>Toggle People</button>
    </div>
    );
};

export default cockpit;