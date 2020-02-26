import React from 'react';
import './App.css';

class App extends React.Component {

  constructor (props) {
    super( props );
    this.state = {
      data: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      user: null,
    };
  }

  handleChange = e => {
    console.dir( e.target );
    this.setState( {
                     data: {
                       ...this.state.data,
                       [e.target.name]: e.target.value
                     },
                   } );
  };

  submitHandler = e => {

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( this.state.data )
    };

    fetch( 'http://192.168.0.106:3000/authorization/sign_up', options )
      .then( response => response.json() )
      .then( user => {
        this.setState( { user } );
      } )
      .catch( console.dir );
    e.preventDefault();
  };

  render () {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '320px'
      }}>
        <input type="text" value={this.state.data.firstName}
               onChange={this.handleChange} placeholder="Name" name="firstName"/>
        <input type="text" value={this.state.data.lastName}
               onChange={this.handleChange} name="lastName" placeholder="Surname"/>
        <input type="email" value={this.state.data.email}
               onChange={this.handleChange} name="email" placeholder="email"/>
        <input type="password" value={this.state.data.password}
               onChange={this.handleChange} name="password" placeholder="password"/>
        <input type="button" onClick={this.submitHandler} value={'Sign up'}/>
      </div>
    );
  }
}

export default App;
