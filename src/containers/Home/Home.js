import React from 'react'
import Dashboard from '../../components/Dashboard/Dashboard'
import HomePublic from '../../components/Home/Home' 
import AuthContext from '../../contexts/auth'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render () {

        const dashboard = <Dashboard />
        const homePublic = <HomePublic />
        return(
            <AuthContext.Consumer>
                {
                    (contextData) => {
                        if (contextData.user) {
                            console.log(contextData)
                            return dashboard
                        } else {
                            return homePublic
                    }
                }
            }                   
            </AuthContext.Consumer>
        )
    }
}

export default Home