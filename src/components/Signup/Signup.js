import React from 'react'
import firebase from '../../firebase'
import AuthContext from '../../contexts/auth'
import {Redirect} from 'react-router-dom'
import {createUser} from '../../services/api_connections'

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username:'',
            email:'',
            password:'',
            message:''
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const {username, email, password} = this.state
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            return this.getToken()
        }).then((idToken)=>{
            console.log('user about to be created')
            const body = {
                username:username,
                email:email,
                token:idToken,
                avatar:''
            }
            return createUser(body)
        }).then(r => {
            console.log(r)
        })
        .catch(err => {
            const {message} = err
            this.setState({ error:message})
        })
    }
    
    getToken = () => {
        return firebase.auth().currentUser.getIdToken(true)
    }

    render () {

        const displayForm = <>
        <form>
            <div className='form-group'>
                <label>Username</label>
                <input type='text' name='username' className='form-control' placeholder='Enter username' onChange={this.handleInput}/>
            </div>
            <div className='form-group'>
                <label>Email Address</label>
                <input type='email' name='email' className='form-control' placeholder='Enter email' onChange={this.handleInput}/>
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input type='password' name='password' className='form-control' placeholder='Password' onChange={this.handleInput}/>
            </div>
            <button type='submit' className='btn btn-primary' onClick={this.handleSubmit}>Submit</button>
        </form>
        {console.log(this.state.message)}
        </>

    return (
        <AuthContext.Consumer>
            {
                (user) => {
                    if (!user) {
                        return displayForm
                    } else {
                        return displayForm
                    }
                }
            }
        </AuthContext.Consumer>
    )
    }
}

export default Signup