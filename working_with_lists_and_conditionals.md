# Working with lists and conditionals 

## Rendering content conditionally 

Wrapping some content within a sec of curly braces gives the ability to write JavaScript within it. 

```
{<div>
</div>}
```

For the purposes of conditionals, ternary expressions can be used. In the example below, the content is rendered if showPersons is true, else it does nothing. 

```
return ( 
  { this.state.showPersons ? 
    <div>
      <Person
        name={this.state.persons[0].name}
        age={this.state.persons[0].age}
      />
    </div> : null
  }
);
```

The null at the end denotes what happens if the expression does not return true. 

## Handling dynamic content "The JavaScript way"

The above section shows an example of using a ternary expression in React. This is great, but can be confusing if we need nested statements. It can be hard to keep track of what expression is doing what. 

The cleaner solution for this is to keep in mind that the render function is called everytime the DOM is updated. So the logic surrounding what content is returned could be done before the return statement. Changing the example above this would look like: 

```
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          <Person
            name={this.state.persons[0].name}
            age={this.state.persons[0].age}
          />
        </div> 
      );
    }

    return (
      <div className="App">
        <h1>Hi, I am a React App</h1>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Toggle People</button>
          {persons}
      </div>
    );
```

Which is the more preferred way of doing it, as it makes it look cleaner and is easier to manage. Be aware that there is also a toggle that switches the state of this.state.showPersons between true and false each time a button is clicked. 

## Outputting lists 

A conversion between a JavaScript array and JSX may be needed before React can work with it. It can be declared as: 

```
    persons: [
      { name: 'Adam', age: 29 },
      { name: 'Herpa', age: 30 },
      { name: 'Derpa', age: 31 }
    ]
```

In JavaScript. The above example would need to be converted before being used inside of a React Component, the map function can allow us to do this. 

```
...Component code

// Show contents of array
{this.state.persons.map(person => {
  return <Person 
    name={person.name}
    age={person.age}
  />
})}

```

Map takes the element array index as an input. Using an arrow function means that it is called for each element in the array. By specifying `return`, it will attempt to return everything for that index, in our case we will be returning a Person object for each Person found in the array. 

Be wary that using the above will introduce a warning about how a key was not assigned, which should be addressed, to address this, we need to use the key prop, which is a default property that React expects to find on a component. It helps React update the list efficiently. 

This is as simple as assigning the key property to what is returned:

```
  {this.state.persons.map((person) => {
    return <Person 
      name={person.name}
      age={person.age}
      key={person.id} // Tell React what index to update on
    />
  })}
```

An index on the list can also be returned when specifying the second parameter for the map function: 

```
  {this.state.persons.map((person, index) => {
    return <Person 
      click={() => this.deletePersonHandler(index)}
      name={person.name}
      age={person.age}
      key={person.id} // Tell React what key to expect
    />
  })}
```

Which is useful for when you need to pass an identifer through to another function that is relative to the index for the list, rather than for metadata related to an object. 

This could be improved even further by using flexible lists to clean up how the data is presented above.

## Updating State Immutability 

When updating a variable and setting the state, make sure to use the slice method to copy the values from the object, rather than altering the references variable. 

So don't do: 

```
  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons;
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }
```

And instead do: 

```
  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons]; <<<
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }
```

## Flexible Lists

If we need to update a specific rows value for a given list of People, we can set up a function that can be used to update content dynamically. 

```
  {this.state.persons.map((person, index) => {
    return <Person 
      click={() => this.deletePersonHandler(index)}
      name={person.name}
      age={person.age}
      key={person.id}
      changed={(event) => this.nameChangedHandler(event, person.id)}
    />
  })}
```

The changed property declares a binding to a handler function that can used for specific events on input elements: 

```
<input type="text" onChange={props.changed} value={props.name}/>
```

In this example, when the input box is clicked on and text is entered, the nameChangedHandler function is evoked, which will update the props.name value. When Props change, React detects this and the DOM is re-rendered. 

To change the name, the follow code assumes that there is a set state for a component where an array of people are declared: 

```
  // A person has an id, a name, and an age. 
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    
    const person = { 
      // Slice the value of the person to create a new variable
      // rather than a reference
      ...this.state.persons[personIndex]
    };
    
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person; 

    // Update the `person.name` value for the object with the events target value,
    // which will be relative to what is entered within the text box. 
    this.setState( {persons: persons} );
  }
```