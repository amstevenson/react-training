import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4, 
    meat: 1.3, 
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0, 
            bacon: 0,
            cheese: 0, 
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    // Called at the end of add or remove ingredient to see if we want to change 
    // purchasable to true or false 
    updatePurchaseState(ingredients) {
        // total up all values in an array
        // Create keys
        const sum = Object.keys(ingredients)
            // Return new value and replace the old, returns an array of values ([1, 2, 3, 4] etc)
            .map(igKey => {
                return ingredients[igKey]
            })
            
            // call reduce to get the total sum of the values within the array above
            // Sum is the currently updated sum, and gets updated each time the function is called
            // for each object in the array. The 'el' is the elements value.
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;

        // To avoid mutability issues. It is important to keep trace of the state
        // it was at before to avoid race condition type events. 
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;

        console.log('[BurgerBuilder.js] (adding) updatedIngredients array is: ', updatedIngredients);
        console.log('[BurgerBuilder.js] (adding) updated total price: ', newPrice)

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]

        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;

        // To avoid mutability issues. It is important to keep trace of the state
        // it was at before to avoid race condition type events. 
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - priceDeduction;

        console.log('[BurgerBuilder.js] (deducting) updatedIngredients array is: ', updatedIngredients);
        console.log('[BurgerBuilder.js] (deducting) updated total price: ', newPrice)

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }

    render() {
        
        console.log('[BurgerBuilder.js] initial state is: ', this.state);

        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0
        }

        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} 
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler} 
                    purchasable={this.state.purchasable}
                    disabled={disabledInfo} 
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;