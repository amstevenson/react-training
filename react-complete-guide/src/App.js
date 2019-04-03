import React, { Component } from 'react';
import styles from './app.module.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'

class App extends Component {
  state = {
    persons: [
      { id: 0, name: 'Adam', age: 29 },
      { id: 1, name: 'Herpa', age: 30 },
      { id: 2, name: 'Derpa', age: 31 }
    ],
    showPersons: false
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.userId === id;
    });
    
    const person = { 
      ...this.state.persons[personIndex]
    };
    
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person; 

    this.setState( {persons: persons} );
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  render() {

    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)}
              />
          })}
        </div> 
      );

      btnClass = styles.Red;
    }

    const classes = [];
    if (this.state.persons.length <=2 ) {
      classes.push(styles.red); 
    } 
    if (this.state.persons.length <=1 ) {
      classes.push(styles.bold);
    }

    return (
      <div className={styles.App}>
        <h1>Hi, I am a React App</h1>
        <p className={classes.join(' ')}>Woo, an application made with React</p>
        <button 
          className={btnClass}
          onClick={this.togglePersonsHandler}>Toggle People</button>
          {persons}
      </div>
    );
  }
}

export default App;
