import React from 'react'
import {getUser, getFollowersList, getUserById} from '../../services/api_connections'
import {Redirect} from 'react-router-dom'
import FollowerCard from '../../components/FollowerCard/FollowerCard'

class Following extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            following:[],
            redirect:false
        }
    }

    componentDidMount(){
        if(!this.props.location.state){
            this.setState({redirect:true})
        } else {
        const {token} = this.props.location.state
        getUser({token}).then(userData => {
            getFollowersList(userData.data.user.id, true, false).then(followingListData=>{
                const getUserByIdArray = followingListData.data.following.map(e=>{
                    return getUserById(e.person_being_followed_id)
                })
                Promise.all(getUserByIdArray).then(data=>{
                    this.setState({following:data})
                })
            })
        })}
    }

    render(){
        const followers = this.state.following.map(e=>{
            return <FollowerCard user={e}/>
        })
        return(
            <>
                {this.state.redirect?<Redirect to='/'/>:followers}
            </>
        )
    }
}

export default Following