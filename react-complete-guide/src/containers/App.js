import React, { Component } from 'react';
import styles from '../assets/app.module.css';
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'

class App extends Component {
  
  constructor(props) {
    super(props)
    console.log('[APP.js] constructor')
  }

  state = {
    persons: [
      { id: 0, name: 'Adam', age: 29 },
      { id: 1, name: 'Herpa', age: 30 },
      { id: 2, name: 'Derpa', age: 31 }
    ],
    showPersons: false
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props)
    return state
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount')
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate')
    return true;
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
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
    console.log('[App.js] render')
    let persons = null;

    if (this.state.showPersons) {
      persons = (
          <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler} />
      );
    }

    return (
      <div className={styles.App}>
          <Cockpit 
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.togglePersonsHandler}/>

          {persons}
      </div>
    );
  }
}

export default App;
