/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react'
import PreviewCard from './previewCard'
import axios from 'axios'
import Pagination from './pagination'
import SearchForm from './search'

import '../styles/pokedex.css'

export default class Pokedex extends PureComponent {
   constructor(props){
      super(props)
      this.state = { 
         previewCardsPerPage: 150,
         indexOfPage: 0,
         pokemonsData: undefined
      }
      this.count = undefined
      this.links = []
      this.names = []

   }
   getPokemonsInfo = async () => {
      if(!this.state.count){
         const data = await axios.get('https://pokeapi.co/api/v2/pokemon/')
            .then((response) => {
               return response.data.results
            })
         const count = data.length
         this.count = count
         const links = []
         const names = []
         data.map((item) => {
            names.push(item.name)
            links.push(item.url)
            return null
         })
         this.links = links
         this.names = names
      }
      const startPoint = this.state.indexOfPage * this.state.previewCardsPerPage
      const endPoint = startPoint + this.state.previewCardsPerPage
      const links = this.links
      const pokemonsData = []
      for( let i = startPoint, j = 0; i < endPoint; i++ , j++ ) { 
         if( links[i] ){
            pokemonsData[j] = this.getData(links[i])
         }else{
            break
         }
      }
      Promise.all(pokemonsData)
         .then((results) => {
            this.setState({
               pokemonsData: results
            })
         })
   }
   getData = (url) => {
      const data = axios.get(url)
         .then((res) => {
            return res.data
         })
         return data
   }
   prevPage = () => {
      this.setState({
         indexOfPage: this.state.indexOfPage - 1
      })
      this.getPokemonsInfo()
   }

   nextPage = () => {
      this.setState({
         indexOfPage: this.state.indexOfPage + 1
      })
      this.getPokemonsInfo()
   }

   certainPage = (num) => { //changePage
      const index = num - 1
      this.setState({
         indexOfPage: index
      })
      this.getPokemonsInfo()
   }

   componentDidMount() {
      this.getPokemonsInfo()
   }
   render() {
      return (
         <div className="pokedex_container container">
         <SearchForm names={this.names}/>
            <Pagination 
               prevPage={this.prevPage}
               nextPage={this.nextPage}
               count={this.count}
               previewCardsPerPage={this.state.previewCardsPerPage}
               certainPage={this.certainPage}
               indexOfPage={this.state.indexOfPage}

            />            
            {
               this.state.pokemonsData &&
               <div>
                  
                  <div className="pokedex_container">
                     {
                        this.state.pokemonsData.map((item, id) => {
                           return <PreviewCard {...item} key={id}/>
                        })
                     }
                  </div>
               </div>
            }
         </div>
      )
   }
}