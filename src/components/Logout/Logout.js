import React from 'react';
import firebase from '../../firebase';

export default class Logout extends React.Component {

  componentDidMount() {
      console.log('signout')
    firebase.auth().signOut()
  }

  render() {
    return <h1>Logging out...</h1>
  }
}