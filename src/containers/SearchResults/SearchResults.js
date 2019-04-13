import React from 'react'
import SearchResultsCard from '../../components/SearchResultsCard/SearchResultsCard'

class SearchResults extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            results:[]
        }
    }
    
    componentWillReceiveProps(newProps){
        if(newProps.events){
            this.setState({results:newProps.events})
        }
        
    }

    render(){
        return(
            <>
            {
                this.state.results.length>0?this.state.results.map(event=>{
                return <SearchResultsCard event={event}/>
            }):<p>loading</p>
        }
            </>
        )
    }
}

export default SearchResults