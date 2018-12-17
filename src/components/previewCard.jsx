/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import FullCard from './fullCard'

export default class PreviewCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fullCardIsOpen: false
    }
  }
  openCard = (e) => {
    this.setState({
      fullCardIsOpen: true
    })
  }
  closeCard = (e) => {
    this.setState({
      fullCardIsOpen: false
    })
  }
  render () {
    return (
      <div>
        <div className="card card_item" >
          <div className="card-header">
            { this.props.name[0].toUpperCase() + this.props.name.slice(1) }
          </div>
          <img className="card-img-top"
            src={ this.props.sprites.front_default }
            alt={ this.props.name }/>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">ID: { this.props.id }</li>
              {/*<li className="list-group-item">Height: { this.props.height }</li>*/}
            </ul>

          </div>
          <button className="btn btn-primary" onClick={this.openCard}>More info...</button>
        </div>
        {
          this.state.fullCardIsOpen
          ? <FullCard {...this.props} closeCard={this.closeCard}/>
          : null
        }
      </div>
    )
  }
}
