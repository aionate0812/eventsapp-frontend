import React from 'react'
import firebase from '../../firebase'
import AuthContext from '../../contexts/auth'
import {Redirect} from 'react-router-dom'

class Login extends React.Component  {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:''
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        const {email, password} = this.state
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((response) => {
            console.log('Returns: ', response)
        })
        .catch(err => {
            const {message} = err
            this.setState({ error: message })
        })
    }

    getToken = () => {
        firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
            console.log('token', idToken)
          }).catch(function(error) {
            console.log(error)
          });
    }

    render(){
        const login = <>
        <form>
            <div className='form-group'>
                <label>Email address</label>
                <input type='email' name='email' className='form-control' placeholder='Enter email' onChange={this.handleInput} />
            </div>
            <div className='form-group'>
                <label >Password</label>
                <input type='password' name='password' className='form-control' placeholder='Password' onChange={this.handleInput} />
            </div>
            <small className='form-text text-muted'>Forgot Password?</small>
            <div className='d-flex p-2 bd-highlight justify-content-center'>
                <button type='submit' className='btn btn-primary btn-sm' style={{marginTop:'10px'}} onClick={this.handleSubmit}>Submit</button>
            </div>
        </form>
    </>

    const home = <Redirect to='/' />
    return(
        <AuthContext.Consumer>
        {
            (contextData) => {
                if (contextData.user) {
                    return home
                } else {
                    return login
                }
            }
        }
        </AuthContext.Consumer>
    )}

}

export default Login