/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react'
import PaginationButton from './paginationButton'

export default class Pagination extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      buttons: undefined,
      indexOfPage: undefined
    }
  }
  changePage = (pageNum) => {
    this.props.certainPage(pageNum)
  }
  componentDidUpdate (prevProps) {
    if (
      this.props.count !== prevProps.count ||
            this.props.indexOfPage !== prevProps.indexOfPage
    ) {
      const buttons = []
      const indexOfPage = this.props.indexOfPage
      const numberOfActivePage = this.props.indexOfPage + 1
      console.log(`page ${numberOfActivePage}`)
      for (let i = 0, j = 1; i < this.props.count; i += this.props.previewCardsPerPage, j++) {
        const item = <PaginationButton
          key={j}
          value={j}
          certainPage = {this.changePage.bind(this, j)}
          numberOfPage = {numberOfActivePage}
        />
        buttons.push(item)
      }
      this.setState({
        buttons,
        indexOfPage
      })
    }
  }
  render () {
    return (
      <div className="pagination_container">
        {
          this.props.count &&
               <div>
                 <ul className="pagination">
                   <li className={`page-item ${this.props.indexOfPage <= 0 ? 'disabled' : ''}`} ><a onClick={this.props.prevPage} className='page-link'>{'Prev Page'}</a></li>
                   {
                     this.state.buttons
                   }
                   <li className={`page-item ${this.props.count / this.props.previewCardsPerPage <= this.props.indexOfPage + 1 ? 'disabled' : ''}`}><a onClick={this.props.nextPage} className='page-link'>{'Next Page'}</a></li>
                 </ul>
               </div>
        }
      </div>
    )
  }
}
