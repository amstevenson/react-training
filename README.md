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

## The Basics

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

