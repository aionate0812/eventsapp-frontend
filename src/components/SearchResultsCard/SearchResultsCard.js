import React from 'react'
import moment from 'moment'
import {createEvent, createUserEvent, getUser, getUserEvent, getEvent} from '../../services/api_connections'
import AuthContext from '../../contexts/auth'

class SearchResultsCard extends React.Component {
    static contextType = AuthContext;

    constructor(props){
        super(props)
        this.state = {
            user_is_going:false
        }
    }

    componentDidMount(){
       getUser({token:this.context.token}).then(userData=>{
            getEvent(true,false,this.props.event.id).then(eventData=>{
                if(!eventData.data){
                    this.setState({user_is_going:false})
                } else {
                    getUserEvent(userData.data.user.id,eventData.data.id)
                    .then(data=>{
                        console.log(data)
                        if (data.data){
                            this.setState({user_is_going:true})
                        }
                    })
                }
                
            })
        })
        
    }

    handleGoingButton = (e) => {
        //title,description,host,time,location,eventbrite_id
        if(this.state.user_is_going){
        
            } else {
                
                createEvent({title:this.props.event.name.text,description:this.props.event.description.text,host:this.props.event.organization_id, time:this.props.event.start.utc, location:'TBA', eventbrite_id:this.props.event.id})
        .then(userEventData=>{
            console.log(userEventData)
            if(userEventData.status===200){
                console.log(userEventData.data.id)
                this.setState({user_is_going:true},()=>{
                    getUser({token:this.context.token})
                    .then(userData=>{
                        createUserEvent(userData.data.user.id,userEventData.data.id)
                    })
                })
            }
        })
    }
    }

    render(){
        return(  
            <>
                <div>
                    <img src={this.props.event.logo?this.props.event.logo.url:'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png'} alt='' />
                    <p>{this.props.event.name.text}</p>
                    <p>Date: {moment(this.props.event.start.utc).format('LL')}</p>
                    <button onClick={this.handleGoingButton}>{this.state.user_is_going?'GOING':'WILL GO'}</button>
                </div>
            </>
        )
    }
}

export default SearchResultsCard 
