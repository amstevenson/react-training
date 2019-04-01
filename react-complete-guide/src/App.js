import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Adam', age: 29 },
      { name: 'Herpa', age: 30 },
      { name: 'Derpa', age: 31 }
    ]
  };

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 29 },
        { name: 'Herpa', age: 30 },
        { name: 'Derpa', age: 31 }
      ]
    });
  };

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: 'Adam', age: 29 },
        { name: event.target.value, age: 30 },
        { name: 'Derpa', age: 31 }
      ]
    });
  }

  render() {

    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      marginBottom: '10px',
      cursor: 'pointer'
    };

    return (
      <div className="App">
        <h1>Hi, I am a React App</h1>
        <button 
          style={style}
          onClick={ () => this.switchNameHandler('Super Adam 2') }>Switch Name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
        />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Super herpa 2')}
          changed={this.nameChangedHandler}
        >
          Some other information
        </Person>
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age}
        />
      </div>
    );
  }
}

export default App;
