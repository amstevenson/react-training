import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
  state = {
    persons: [
      { name: 'Adam', age: 29 },
      { name: 'Herpa', age: 30 },
      { name: 'Derpa', age: 31 }
    ]
  }
  
  switchNameHandler = () => {
    console.log('Was clicked!');
  }
  
  render() {
    return (
      <div className="App">
        <h1>Hi, I am a React App</h1>
        <button onClick={this.switchNameHandler}>Switch Name</button>
        <Person name={ this.state.persons[0].name } age={ this.state.persons[0].age }> Some additional information. </Person>
        <Person name={ this.state.persons[1].name } age={ this.state.persons[1].age }/>
        <Person name={ this.state.persons[2].name } age={ this.state.persons[2].age }/>
      </div>
    );
  }
}

export default App;
