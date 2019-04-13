import React from 'react'
import UserInfo from '../Dashboard-User-Info/Dashboard-User-Info'
import AuthContext from '../../contexts/auth'
import {getUser, getFollowers} from '../../services/api_connections'
import Posts from '../../containers/Posts/Posts'

class Dashboard extends React.Component  {

    static contextType = AuthContext;

    constructor(props) {
        super(props)
        this.state = {
            token:'',
            user:null
        }
    }

    componentDidUpdate() {
            if(this.state.token !== this.context.token){ 
                this.setState({token:this.context.token}, ()=>{
                    getUser({token:this.state.token}).then((data=>{
                        this.setState({user:data.data.user}, ()=>{
                            getFollowers(this.state.user.id).then((data)=>{
                                console.log(data.data)
                                const updateUser = this.state.user
                                updateUser.followingCount = data.data.followerCount[1].count
                                updateUser.followerCount = data.data.followerCount[0].count
                                this.setState({user:updateUser})
                            })
                        })
                    }))
                })   
        }
       
    }


   render (){ 
       return(
        <div>
            {this.state.user?<><UserInfo token={this.state.token} user={this.state.user}/> <Posts token={this.state.token} user={this.state.user}/> </>:<p>loading</p>}
            
        </div>
    )
}
}

export default Dashboard

