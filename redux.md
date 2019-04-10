# Redux

## State Can Be Complex

Managing the State can be difficult as an application grows. Especially when passing props between a large amount of components. Redux helps to solve this by making it simpler. 

Imagine a scenario like the below:

To talk between sides would be convoluted if we had to create connections between main components. Likely including a large amount of chained props. 

![alt text][logo]

[logo]: ./state_complex.PNG "State Complex"

## Redux to the Rescue

Redux gives us a certain flow or way of managing data, that we can integrate with another package into the React app. So it does react to changes in data. 

In the end its all about the `central store` we have in each redux application. It is a third party library that works independently with React. This store stores the `entire application state`. Can think about it as a giant JavaScript object. 

In a React application we have components. It doesnt do this by directly manipulating the central store. If we edit it from anywhere in our application, we cant see where we may have broke our application from. 

Redux is essentially a clearly defined process that helps us to manage state. 

Actions are dispatched from JavaScript code. React dispatches these with components. These are essentially packages with a type/description like "add ingrediant" or "remove ingredient". We also need to pass the information related to the data (what ingredient for example). 

The Action doesnt hold any logic, or how to update the store. Its just a messenger. The thing updating the store is the `Reducer`. Multiple Reducers can be used, but ultimately only one is used. 

The Reducer can check the type of the application and then define the code for that type of action in the Reducer. The Reducer in the end is a pure function that thats the action and the previous state, and then returns the updated state. 

The reducer has to execute `synchronous code only`. Therefore `no` side effects. However, asynchronous code is still possible (more on that further below). 

The reducer will always return a new state object (as they are references). 

How do we get the updated state back into our component? A `Subscription Model` can be used for this. These are triggered whenever the state is updated in the central store. The component subscribed to it will then recieve an update. We can then use updates to change the UI or to perform other actions. 

![alt text][logo2]

[logo2]: ./redux_rescue.PNG "Redux Rescue"