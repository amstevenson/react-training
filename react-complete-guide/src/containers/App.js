import React, { Component } from 'react';
import styles from '../assets/app.module.css';
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'
import WithClass from '../hoc/WithClass'
import AuthContext from '../context/auth-context'

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
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: true
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

    this.setState((prevState, props) => {
      
      return {
        persons: persons, 
        changeCounter: prevState.changeCounter + 1
      }
    });
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

  loginHandler = () => {
    console.log('[App.js] login function clicked')
    this.setState({authenticated: true});
  }

  render() {
    console.log('[App.js] render')
    let persons = null;

    if (this.state.showPersons) {
      persons = (
          <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler} 
            isAuthenticated={this.state.authenticated}/>
      );
    }

    return (
      <WithClass classes={styles.App}>
          <button onClick={() => { 
              this.setState({showCockpit: false });
          }}>Remove Cockpit</button>

          <AuthContext.Provider value={{
              authenticated: this.state.authenticated, 
              login: this.loginHandler
          }}>
            { this.state.showCockpit ? (  
              <Cockpit 
                title={this.props.appTitle}
                showPersons={this.state.showPersons}
                personsLength={this.state.persons.length}
                clicked={this.togglePersonsHandler}
                login={this.loginHandler}/>
                ) : null 
            }
            {persons}
          </AuthContext.Provider>

      </WithClass>
    );
  }
}

export default App;
