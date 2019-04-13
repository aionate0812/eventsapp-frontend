import React from 'react'
import {getFollowers} from '../../services/api_connections'
import UserInfoResults from '../UserInfoResults/UserInfoResults'

class UserResults extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user:{}
        }
    }

    componentDidMount(){
        getFollowers(this.props.user[0].id).then(data => {
            let user = this.props.user[0]
            if(data.data.followerCount.length<2){
                user.followerCount = 0
                user.followingCount = 0
            } else {
                user.followerCount = data.data.followerCount[0].count
                user.followingCount = data.data.followerCount[1].count
            }
            this.setState({user},()=>{console.log(this.state.user)})
            
        })
    }

    componentWillReceiveProps(newProps){
        console.log(newProps)
    }

    render(){
        console.log(this.state.user.followers)
        return(
            <>
            {this.state.user.username?<UserInfoResults user={this.state.user}/>:<p>loading1</p>}
            </>
        )
    }
}

export default UserResults