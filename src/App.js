import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'
import firebase from './firebase'
import Navbar from './components/Navbar/Navbar'
import LoginSignup from './containers/Login_Signup/Login_Singup'
import Logout from './components/Logout/Logout'
import AuthContext from './contexts/auth'
import Home from './containers/Home/Home'
import Search from './containers/Search/Search'
import Following from './containers/Following/Following'
import Followers from './containers/Followers/Followers'



class App extends Component {

  state = {
    user:null,
    token:'notupdated'
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user})
        firebase.auth().currentUser.getIdToken(true)
    .then(token=>{
      this.setState({token})
    })
      }
      else {
        this.setState({user:null})
      }
    })

  }

  componentWillUnmount() {
    this.unsubscribe()
  }


  render() {
    return (
      <HashRouter>
        <AuthContext.Provider value={this.state}>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/login' exact component={LoginSignup}></Route>
          <Route path='/logout' exact component={Logout}></Route>
          <Route path='/search' exact component={Search}></Route>
          <Route path='/following' exact component={Following}></Route>
          <Route path='/followers' exact component={Followers}></Route>
        </Switch>
        </AuthContext.Provider>
      </HashRouter>
    );
  }
}

export default App;

