import React, { Component } from 'react'
import Pokedex from './components/pokedex'
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Route path="/" component={Pokedex}/>
      </BrowserRouter>
    )
  }
}

export default App
