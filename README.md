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

3) When hooks are used, the virtual DOM will check to see if the real DOM needs to be updated or not before proceeding to do so. It does this by checking if the State has changed, or if any props have changed (more on this in later sections below). 

## List of Modules

[Next-Gen JavaScript](./next_gen_js.md)
[The Basics](./the_basics.md)
[Working with Lists and Conditionals](./working_with_lists_and_conditionals.md)
[Styling React Components](./styling_react_components.md)
[Debugging](./debugging.md)
[Components Deep Dive](./components_deep_dive.md)
[Building the Burger App](./building_the_burger_app.md)

## TODO:

### HTTP Requests

### Routing

### Forms and Validation

### Redux

### Authentication

### Testing Introduction

### Deployment

### Bonus sections

