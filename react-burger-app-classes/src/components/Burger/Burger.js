import React from 'react';
import styles from './burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {

    console.log('[Burger.js] passed in ingredients are: ', props.ingredients)

    let transformedIngredients = Object.keys(props.ingredients)

        // Loop through each ingredient type
        .map(igKey => {

            // Splice the array (get an array back for the type in question)
            return [...Array(props.ingredients[igKey])] // [,]

                // Loop through each item in the array (if there are two salads, it will loop twice)
                // and for each one assign a unique key to it and return a BurgerIngredient object.
                .map((_, i) => {
                    return <BurgerIngredient key={igKey + i} type={igKey} />
                });

        // Reduce transforms an array into something else.
        // Arr is the always updated route argument which we want to update. 
        // We want to add the element to the end of the array using concat
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
        }).reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    console.log('[Burger.js] transformedIngredients are: ', transformedIngredients);
    
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;