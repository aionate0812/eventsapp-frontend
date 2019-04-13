import React from 'react'
import AuthContext from '../../contexts/auth'
import AutoSuggest from 'react-autosuggest'
import { getInterests, getEventbriteSubcategories, getUsers, getUserByUsername } from '../../services/api_connections';
import SearchResults from '../../containers/SearchResults/SearchResults'
import UserResults from '../../components/UserResults/UserResults'

class Search extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            search_items:null,
            value:'',
            suggestions:[],
            eventbriteResults:[],
            userResults:[]
            
        }
    }

    // Teach Autosuggest how to calculate suggestions for any given input value.
 getSuggestions = value => {
     console.log('value', value)
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : this.state.search_items.map((section,i) => {
      return {
        title:section.category,
        items:i===0?
        section.items.filter(item => item.interest_name.toLowerCase().slice(0, inputLength) === inputValue):
        section.items.filter(item => item.username.toLowerCase().slice(0, inputLength) === inputValue)
      
      }
    }
      // interest.interest_name.toLowerCase().slice(0, inputLength) === inputValue
    ).filter(section => section.items.length > 0)
  };
  
   getSuggestionValue = suggestion => {
       return suggestion.interest_name || suggestion.username;
   }
  
  
   renderSuggestion = suggestion => (
    <div dataset={suggestion.eventbrite_id || ''}>
      {suggestion.interest_name || suggestion.username}
    </div>
  );

  
    componentDidMount(){
        getInterests()
        .then((interestData)=>{
            console.log(interestData.data.interests)
           getUsers().then(userData=>{
              console.log(userData)
              this.setState({search_items:[{category:'interests', items:interestData.data.interests},{category:'users',items:userData.data}]})
           })
            
        })
    }

    onChange = (event, { newValue, method }) => {
      this.setState({
        value: newValue
      });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: this.getSuggestions(value)
        });
      };
    
      onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
      };
    
    onSuggestionSelected = (e) => {
     const value  = this.state.value
     let eventId = null
     this.state.suggestions.forEach((suggestion)=>{
       suggestion.items.forEach(element=>{
         if(element.interest_name){
          if(element.interest_name===value.trim()){
            eventId = element.eventbrite_id
            getEventbriteSubcategories(eventId)
            .then((data)=>{
              this.setState({eventbriteResults:data.data.events, userResults:[]},()=>{console.log(this.state)})
            })
          }
         } else {
           if(element.username === value.trim()){
           getUserByUsername(element.username).then(data=>{
            this.setState({userResults:[data.data],eventbriteResults:[]},()=>{console.log(this.state)})
           })
          }
         }
         
        }) 
    })
  }

    selectedSuggestion = (suggestion) => {
        console.log(suggestion)
    }

    renderSectionTitle = (section) => {
      return(
        <strong>{section.title}</strong>
      )
    }

    getSectionSuggestions = (section) => {
      return section.items
    }


    render () {
        const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search users or events',
      value,
      onChange: this.onChange
    };

        const searchInput = <AutoSuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        onSuggestionSelected={this.onSuggestionSelected}
        multiSection={true}
        renderSectionTitle={this.renderSectionTitle}
        getSectionSuggestions={this.getSectionSuggestions}
        inputProps={inputProps}
      />

        const search = <>
        {searchInput}
        {this.state.eventbriteResults.length>0 ? <SearchResults events={this.state.eventbriteResults}/> : this.state.userResults.length>0?<UserResults user={this.state.userResults}/> : <p>loading</p>}
        </>
        return(
            <AuthContext.Consumer>
            {
                (contextData)=>{
                    if(contextData.user){
                        return search
                    } else {
                        return searchInput
                    }
                }
            }
            </AuthContext.Consumer>
        )
    }
}

export default Search

// import React from 'react'
// import Autosuggest from 'react-autosuggest'

// const languages = [
//   {
//     title: '1970s',
//     languages: [
//       {
//         name: 'C',
//         year: 1972
//       }
//     ]
//   },
//   {
//     title: '1980s',
//     languages: [
//       {
//         name: 'C++',
//         year: 1983
//       },
//       {
//         name: 'Perl',
//         year: 1987
//       }
//     ]
//   },
//   {
//     title: '1990s',
//     languages: [
//       {
//         name: 'Haskell',
//         year: 1990
//       },
//       {
//         name: 'Python',
//         year: 1991
//       },
//       {
//         name: 'Java',
//         year: 1995
//       },
//       {
//         name: 'Javascript',
//         year: 1995
//       },
//       {
//         name: 'PHP',
//         year: 1995
//       },
//       {
//         name: 'Ruby',
//         year: 1995
//       }
//     ]
//   },
//   {
//     title: '2000s',
//     languages: [
//       {
//         name: 'C#',
//         year: 2000
//       },
//       {
//         name: 'Scala',
//         year: 2003
//       },
//       {
//         name: 'Clojure',
//         year: 2007
//       },
//       {
//         name: 'Go',
//         year: 2009
//       }
//     ]
//   },
//   {
//     title: '2010s',
//     languages: [
//       {
//         name: 'Elm',
//         year: 2012
//       }
//     ]
//   }
// ];

// // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
// function escapeRegexCharacters(str) {
//   return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// }

// function getSuggestions(value) {
//   const escapedValue = escapeRegexCharacters(value.trim());
  
//   if (escapedValue === '') {
//     return [];
//   }

//   const regex = new RegExp('^' + escapedValue, 'i');

//   return languages
//     .map(section => {
//       return {
//         title: section.title,
//         languages: section.languages.filter(language => regex.test(language.name))
//       };
//     })
//     .filter(section => section.languages.length > 0);
// }

// function getSuggestionValue(suggestion) {
//   return suggestion.name;
// }

// function renderSuggestion(suggestion) {
//   return (
//     <span>{suggestion.name}</span>
//   );
// }

// function renderSectionTitle(section) {
//   return (
//     <strong>{section.title}</strong>
//   );
// }

// function getSectionSuggestions(section) {
//   return section.languages;
// }

// class Search extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       value: '',
//       suggestions: []
//     };    
//   }

//   onChange = (event, { newValue, method }) => {
//     this.setState({
//       value: newValue
//     });
//   };
  
//   onSuggestionsFetchRequested = ({ value }) => {
//     this.setState({
//       suggestions: getSuggestions(value)
//     });
//   };

//   onSuggestionsClearRequested = () => {
//     this.setState({
//       suggestions: []
//     });
//   };

//   render() {
//     const { value, suggestions } = this.state;
//     const inputProps = {
//       placeholder: "Type 'c'",
//       value,
//       onChange: this.onChange
//     };

//     return (
//       <Autosuggest 
//         multiSection={true}
//         suggestions={suggestions}
//         onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
//         onSuggestionsClearRequested={this.onSuggestionsClearRequested}
//         getSuggestionValue={getSuggestionValue}
//         renderSuggestion={renderSuggestion}
//         renderSectionTitle={renderSectionTitle}
//         getSectionSuggestions={getSectionSuggestions}
//         inputProps={inputProps} />
//     );
//   }
// }

// export default Search