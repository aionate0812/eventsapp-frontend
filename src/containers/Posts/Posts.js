import React from 'react'
import {getUserEvents, getEvent} from '../../services/api_connections'
import PostCard from '../../components/PostCard/PostCard'

class Posts extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            events:[]
        }
    }

    componentDidUpdate(){
        getUserEvents(this.props.user.id)
        .then( userEvents => {
            const userEventsArray = userEvents.data.map( event => {
                return(getEvent(false,true,event.event_id))
            })
            Promise.all(userEventsArray).then(data => {
                const events = data.map(element => element.data)
                this.setState({events})
            })
        })
    }

    render(){
        
        return(
            <>
            {this.state.events.map(event => {
                return(
                    <PostCard eventInfo={event} />
                )
            })
        }
            </>
        )
    }
}

export default Posts