# React Training

## Websites to run test code on

1) codepen.io is great for creating/editing html,css, javascript on the side.
2) jsbin.com for running javascript/html

## Behind the scenes

1) Babel transforms html within React blocks to javascript in the background, so 'class' is transformed to
className by default.

2) On multi page applications, the assumption is that a server will be involved with supplying the logic.
The preferred approach is to have single page applications (individual html pages) managed with widgets
containing business logic.

- Single: widgets in a hierarchical structure, only one ReactDOM.render call.
- multiple: only segments are widgets, multiple ReactDOM.render calls.

## Next-Gen Javascript

### Let and Const

1) ES6. Different ways of creating a variable to var.
2) Var still works, but encourages to use let and const.
3) Let = variable values that changes. Const = a constant value, a final.

Read more about let : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

Read more about const : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const

### Arrow functions

1) Different way of creating javascript functions.

For example:

```
const myFnc = () => {
}

Can omit () if using one parameter only, else it would need to be (name, age) etc.
const printMyName = name => {
    console.log(name);
}

If running on one line, can do:
const multiply = number => number * 2;

```

2) Removes the issues surrounding the this keyword. Running this inside of an arrow function means
that its always referring to the context of that specific function.

Read more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

### Exports and Imports (Modules)

1) Writing modular code spread up over files. Which are then imported on the html files.
2) For example, one for a header and a footer.
3) Exporting:

Singular:

```
const person = {
    name: 'Max'
}

export default person
```

default means that its the default export of a file.

Multiple:

```
export const clean = () => {}
export const baseData = 10;
```

4) Importing:

```
import person from './person.js'
import prs from './person.js' - a default export means we can call it whatever we wish.

import { baseData } from './utility.js'
import { clean } from './utility.js'

or for one line:

import { basedata, clean } from './utility.js'

importing all:

import * as bundled from './utility.js'

then refer to:

bundled.person etc.

```

These are advanced importing features which require additional requirements, so browsers will need to be
set up to use them.

### Classes, Properties and Methods

Pretty much the same as other languages, just with a different syntax.

```
class Human {
  gender = 'male';

  printGender = () => {
    console.log(this.gender)
  }
}

class Person extends Human {
  name = 'Adam';

  printMyName = () => {
    console.log(this.name)
  }
}

const person = new Person();
person.printMyName();
person.printGender();
```

2) Different syntax of setting properties and methods.

Properties:

Saves us the trouble of setting the constructor function call. However this only works in ES7.

ES6
```
constructor() {
    this.myProperty = 'value'
}
```

ES7
```
myProperty = 'value'
```

Methods:

ES6
```
myMethod(){}
```

ES7
```
myMethod = () => {}
```

### Spread and Rest Operators

The operator is just three dots ...

1) Spread:

Used to split up array elements OR object properties.

```
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4]; // adds four to array

console.log(newNumbers);

const person = {
  name: 'Adam'
};

const newPerson = {
  ...person,
  age: 28
}

console.log(newPerson)

Outputs:

[1, 2, 3, 4]
[object Object] {
  age: 28,
  name: "Adam"
}

```

2) Rest:

Used to merge a list of function arguments into an array

```
args may contain more than one argument.

const filter = (...args) => args.filter(el => el === 1); // three '=' signs checks for type and equality

console.log(filter(1, 2, 3))

output:

[1] (as the above is only returning values where it is equal to 1.)
```

### Destructuring

Easily extract array elements or object properties and store them in variables.

Different to spread or Rest in the sense this is only pulling out one single property.

1. Array Destructuring

```
const numbers = [1, 2, 3];

[num1, , num3] = numbers
console.log(num1, num3)

Output:
1
3
```

2. Object Destructuring

Targets a specific property.

```
{name} = {name: 'Adam', age: 28}
console.log(name) // Adam
console.log(age) // undefined, unless we specify 'age' rather than name in the above
```

### References

Arrays/objects are stored in memory, and subsequent parameter declarations that copy the value
from that array/object results in a pointer being created.

```
const person = {
  name: 'adam'
};

const secondPerson = person;

person.name = 'derp'

console.log(secondPerson);

output:
[object Object] {
  name: "derp"
}

```

To get around this, can make it so that the array/object is immutable, so a new copy is created
rather than a reference.

```
const person = {
  name: 'adam'
};

const secondPerson = {
  ...person
};

person.name = 'derp'

console.log(secondPerson);

output:
[object Object] {
  name: "adam"
}
```

### Array functions

Running a function on each element of an array using map:

```
const numbers = [1, 2, 3];

// May differ, so check docs if this doesnt work
const doubleNumArray = numbers.map(num => num * 2);

console.log(numbers);
console.log(doubleNumArray);

output:
[1, 2, 3]
[2, 4, 6]
```

Other functions can be derived from looking at the documentation.

The following page gives a good overview over the various methods you can use on the array prototype:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

Other functions to look into are:

- map()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
- find()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
- findIndex()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
- filter()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
- reduce()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?v=b
- concat()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat?v=b
- slice()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
- splice()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

## The Basics

### Using a Build Workflow

We will be using npm. Node package manager. To manage dependencies.

We will be using Webpack to bundle up files together for when we come to deploy the mini projects.

We will be using babel to translate old features to model (babel) and to compile next gen javascript.

We will be using a development server to run code locally.

### Setup / Creating a template React App

Follow steps outlined in: https://github.com/facebook/create-react-app

This will allow for the creation of a facebook react template app to be made.

Simple instructions:

1) npm install create-react-app -g // install
2) create-react-app react-complete-guide // create a new app. Creates a folder with all dependencies included.
3) Navigate to newly created folder
4) npm start // starts up npm and hosts on http://localhost:3000

#### Understanding folder structure

package.json lists all the dependencies and scripts for the project. The scripts can be run with:

- npm run start
- npm run build
- npm run test
- npm run eject

After a change has been made, can use the build command to update the website.

The node modules folder holds all the dependencies for the project. Has loads in there. Should not edit anything
within here.

public folder contains the root folder that contains the files that we should edit for the website.

Index html is the single page we have upon installing the template. This would be where we could branch off and
facilitate the creation of the entire website.

manifest.json contains some metadata about the project.

The src folder contains all the react specific javascript files, which is effectively the react application. It will
contain all of the components that we will be altering/using. Index.js is the starting point and imports all other
required components from other javascript files.

When starting a new project from this, it's important to remove the component code in app.js to start afresh and
then remove the logo.svg file, as we will not be using that either.

Further to this, I can optionally remove all css content from app.css, and simply keep the .App class definition
should I want to clean it up fully.

### Component basics

In terms of the test project created in the step before, the first render method in index.js specifies the App
class which is imported from `./App`. Replacing that with any html would work, however using a component makes
more sense.

From a best practice point of view, `./App` should be the only declaration here within index.js. This is because
it is defined as the root component. This is akin to a hierarchical structure wherein we have a main block component
and subsequent components should be placed within it, rather than alongside it. So in this sense, `App.js` should
have a class called App that has all the component declarations within it.

The render() method within App.js will render something to the screen.

## Debugging

## Styling components

## Components Deep Drive

## HTTP Requests

## Routing

## Forms and Validation

## Redux

## Authentication

## Testing Introduction

## Deployment

## Bonus section

