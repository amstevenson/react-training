# Notes from course

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
