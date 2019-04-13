import React from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../contexts/auth'

const Navbar = (props) => {
    const login = <li className='nav-item'>
    <Link className='nav-link' to='/login'>Login</Link>
  </li> 
    const logout = <li className='nav-item'>
    <Link className='nav-link' to='/logout'>Logout</Link>
  </li>

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to='/'>Events</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to='/'>Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/search'>Search</Link>
      </li>
      <AuthContext.Consumer>
      {
            (contextData) => {
                if(contextData.user){
                    return logout
                } else {
                    return login
                }
            }
      }
      </AuthContext.Consumer>
      
      
    </ul>
  </div>
</nav>
    )
}

export default Navbar