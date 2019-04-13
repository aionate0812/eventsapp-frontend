import React from 'react'
import {getUser, getFollowersList, getUserById} from '../../services/api_connections'
import {Redirect} from 'react-router-dom'
import FollowerCard from '../../components/FollowerCard/FollowerCard'

class Followers extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            followers:[],
            redirect:false
        }
    }

    componentDidMount(){
        if(!this.props.location.state){
            this.setState({redirect:true})
        } else {
        const {token} = this.props.location.state
        getUser({token}).then(userData => {
            getFollowersList(userData.data.user.id, false,true).then(followersListData=>{
                console.log(followersListData.data.followers)
                const getUserByIdArray = followersListData.data.followers.map(e=>{
                    return getUserById(e.person_whos_following_id)
                })
                Promise.all(getUserByIdArray).then(data=>{
                    this.setState({followers:data})
                })
            })
        })}
    }

    render(){
        const followers = this.state.followers.map(e=>{
            return <FollowerCard user={e}/>
        })
        return(
            <>
                {this.state.redirect?<Redirect to='/'/>:followers}
            </>
        )
    }
}

export default Followers