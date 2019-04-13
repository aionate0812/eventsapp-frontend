import React from 'react'
import {getLikesCount} from '../../services/api_connections'

class PostCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        // console.log(this.props.eventInfo)
        getLikesCount(this.props.eventInfo.id)
        .then(data=>{
            console.log(data)
        })
    }

    render(){
        return(
            <>
                <p>{this.props.eventInfo.title}</p>
                <p>{this.props.eventInfo.description}</p>
            </>
        )
    }
}

export default   PostCard
