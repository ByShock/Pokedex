/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import FullCard from './fullCard'
import axios from 'axios';

export default class SearchForm extends Component {
   constructor(props) {
      super(props)
      this.state = {
         inputValue: '',
         hints: undefined,
         fullCardIsOpen: false,
         pokemonData: []
      }
   }
   handleChange = (e) => {
      this.setState({
         inputValue: e.target.value
      })
      const inputValue = e.target.value.toLowerCase()
      if(this.props.names.length){
         const names = this.props.names
         const tmpArr = names.filter((item) => {
            return ~item.toLowerCase().indexOf(inputValue)
         })
         this.setState({
            hints: tmpArr
         })
      } else {
         console.log('no names')
      }
          
   }
   handleClick = (e) => {
      const name = e.target.attributes['data-name'].value
      console.log(name)
      this.setState({
            inputValue: name
      })
      
      this.handleSubmit(e)
   }

   handleSubmit = async (e) => {
      e.preventDefault()
      const value = e.target.attributes["data-name"].value.toLowerCase()
      const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${value}/`)
         .then((response) => {
            return response.data
         })
      this.setState({
         fullCardIsOpen: true,
         pokemonData: data
      })
   }

   closeCard = (e) => {
      this.setState({
        fullCardIsOpen: false
      })
    }
   render() {
      return(
         <div className="container-fluid">
            <form className="navbar-form navbar-left" role="search" onSubmit={e => e.preventDefault()}>
               <div className="form-group">
               <fieldset>
                  <legend>
                  Find pokemon by name:
                  </legend>
                  <input type="text"
                         className="form-control"
                         placeholder="Start typing here..."
                         value={this.state.inputValue}
                         onChange={this.handleChange}
                         id="searchInput"
                  />
               </fieldset>
               </div>
               <div>
               {
                  this.state.hints &&
                  this.state.hints.length < 20 ?
                  this.state.hints.map((item, id) => {
                     return <div className="btn btn-outline-dark" 
                                 key={id}
                                 data-name={item}
                                 onClick={this.handleClick}
                                 >{item}</div>
                  }) : ''
               }
               {
                  this.state.fullCardIsOpen && <FullCard {...this.state.pokemonData} closeCard={this.closeCard}/>
               }
               </div>
            </form>
         </div>
      )
   }
}