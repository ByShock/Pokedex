/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

export default class PaginationButton extends Component {
  componentDidUpdate (prevProps) {
    if (
      this.props.visible !== prevProps.visible
    ) {
      console.log('visible')
      this.setState({
        visible: this.props.visible
      })
    }
  }
  componentDidMount () {
    this.setState({
      visible: this.props.visible
    })
  }

  render () {
    return (
      <li
        data-value={this.props.value}
        onClick={this.props.certainPage}
        className={`
               page-item
               ${
      this.props.numberOfPage === this.props.value
        ? ' active'
        : ''
      }
            `}
      >
        <a className='page-link' data-value={this.props.value}>{this.props.value}</a>
      </li>
    )
  }
}
