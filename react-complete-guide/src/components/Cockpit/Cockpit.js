import React, { useEffect, useRef } from 'react';
import styles from './cockpit.module.css'

const cockpit = props => {

    const toggleBtnRef = useRef(null);

    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        toggleBtnRef.current.click();

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

    if (props.personsLength <=2 ) {
      classes.push(styles.red); 
    } 
    if (props.personsLength <=1 ) {
      classes.push(styles.bold);
    }

    return (     
    <div className={styles.Cockpit}>   
        <h1>{props.title}</h1>
        <p className={classes.join(' ')}>Woo, an application made with React</p>
        <button 
        ref={toggleBtnRef}
        className={btnClass}
        onClick={props.clicked}>Toggle People</button>
    </div>
    );
};

export default React.memo(cockpit);