import React from 'react'
import './Login_Signup.css'
import Login from '../../components/Login/Login'
import Signup from '../../components/Signup/Signup.js'
import AuthContext from '../../contexts/auth';
import {Redirect} from 'react-router-dom'

class LoginSignup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          login:true
        }
    }

    handleLoginSwitch = (e) => {
      this.setState({login:true})

    }

    handleSignupSwitch = (e) => {
      this.setState({login:false})

    }
    

    render() {
      const login_signup = <>
      <div>
        <div className='access-container'>
          <div className='d-inline-flex p-2 bd-highlight' style={{backgroundColor: '#0E7CFF', width:'100%'}}>
            <div className='col-lg-6 access-btn' onClick={this.handleLoginSwitch}>Login</div>
            <div className='col-lg-6 access-btn' onClick={this.handleSignupSwitch}>Sign Up</div>
          </div>
          <div style={{borderLeft: '1px solid grey', borderRight: '1px solid grey', width:'100%', height:'40px'}}></div>
          <div style={{width: '100%', border: '1px solid grey', borderTop: 'none', paddingBottom: '40px', paddingLeft:'10px', paddingRight:'10px'}}>
            {this.state.login?<Login/>:<Signup/>}
          </div>
        </div>
      </div>
  </>

  const home = <Redirect to='/' />
        return(
          <AuthContext.Consumer>
             {
               (contextData)=>{
                 if(contextData.user){
                    return home
                 } else {
                  return login_signup
                 }
             }
            
            }
          </AuthContext.Consumer>  
        )
    }
}

export default LoginSignup
