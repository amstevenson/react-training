## Styling React Components

### General CSS

Pretty much the same as you presume it would be. Use logic to determine what classes are used for elements. If declaring an array of classes, using the `.join(' ')` method is required.  

Otherwise, use stylesheets and declare classes, id's etc, as I would for any other web based application/site. 

React can work with Radium for inline based CSS changes, that is, where CSS is defined and used in a React component.

### Adding and using Radium

The problem with combining CSS and React natively inline is that sudo selectors (`button:hover` for example) are not compatiable, since React transpiles what is inside the render function. 

Can get around this by using distinct css class names to allow it to be inscope. 

A third party application is required  however to allow for inline css to be used for sudo selectors: `Radium`. 

To install it: 

- npm install --save radium 

Then to use it, import the dependency:

`import Radium from 'radium';`

and wrap the Radium component around the App component that is returned by default: 

`export default Radium(App);`

This will inject some functionality that will parse the styles we use so that sudo selectors work as we expect. 

To use within an inline style, it needs to start with a colon, and be wrapped within a string; as they are not valid JavaScript names, but as strings they are:

```
  const style = {
    backgroundColor: 'green',
    color: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    marginBottom: '10px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'blue',
      color: 'white'
    }
  };

  <button style={style}>Hover button</button>
```

### Using Radium for media related css

Media queries can be used inline when Radium is used: 

```
const person = (props) => {

    const style = {
        '@media (min-width: 500px)': {
            width: '450px'
        }
    };

    return (
        <div className="Person" style={style}>
            <p onClick={props.click}>I am { props.name } and I am { props.age } years old!</p>
            <p>{ props.children }</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    )
};
```

However, this will not work unless the rendered element is wrapped inside of a StyleRoot element:

```
  return (
    <StyleRoot>
    <div className="App">
      <h1>Hi, I am a React App</h1>
      <p className={classes.join(' ')}>Woo, an application made with React</p>
      <button 
        style={style}
        onClick={this.togglePersonsHandler}>Toggle People</button>
        {persons}
    </div>
    </StyleRoot>
  );
```

The `{persons}` output defines a list of elements derived from the component that uses the media css that Radium and StyleRoot work together to facilitate. 

### Using CSS stylesheets

Follow the steps outlined in: 

- https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet

To allow for different css sheets to be used, where certain class names may be the same, but where  the values could differ from one another.

CSS Modules are a relatively new concept (you can dive super-deep into them here: https://github.com/css-modules/css-modules). With CSS modules, you can write normal CSS code and make sure, that it only applies to a given component.

It's not using magic for that, instead it'll simply automatically generate unique CSS class names for you. And by importing a JS object and assigning classes from there, you use these dynamically generated, unique names. So the imported JS object simply exposes some properties which hold the generated CSS class names as values.

Example:

In the post.module.css file

```
.Post {
    color: red;
}
```

In Post Component File

`import styles from './post.module.css';`
 
const post = () => (
    <div className={styles.Post}>...</div>
);

Here, styles.Post  refers to an automatically generated Post  property on the imported styles  object. That property will in the end simply hold a value like Post__Post__ah5_1 .

So your .Post  class was automatically transformed to a different class (Post__Post__ah5_1 ) which is unique across the application. You also can't use it accidentally in other components because you don't know the generated string! You can only access it through the styles object. And if you import the CSS file (in the same way) in another component, the styles  object there will hold a Post  property which yields a different (!) CSS class name. Hence it's scoped to a given component.

By the way, if you somehow also want to define a global (i.e. un-transformed) CSS class in such a .css  file, you can prefix the selector with :global .

Example:

`:global .Post { ... } `

Now you can use className="Post"  anywhere in your app and receive that styling.
