import React, { Component } from 'react'
import '../styles/fullCard.css'

export default class FullCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      imageUrls: [],
      activeImage: undefined
    }
  }
  componentDidMount () {
    console.log(this.props)
    const sprites = this.props.sprites
    const imageUrls = []
    for (const key in sprites) {
      if (sprites[key]) {
        const imgUrl = sprites[key]
        imageUrls.push(imgUrl)
      }
    }
    this.setState({
      imageUrls,
      activeImage: sprites.front_default
    })
  }

  handleClick = (e) => {
     /*const images = document.getElementsByClassName('small_img')
     for(let i = 0; i < images.length; i++){
        images[i].setAttribute('class', 'small_img')
     }*/
     this.setState({
        activeImage: e.target.attributes.src.value
     })

    // e.target.setAttribute('class', 'small_img fullCard_activeImage')
     console.log(this.state)
  }
  render () {
    return (
      <div className="fixed-top card card-item container bg-light fullCard_container">
         <h1 className="card-header">{this.props.name[0].toUpperCase() + this.props.name.slice(1)}</h1>
            <div className="fullCard_content">
            <div className={'fullCard_imageBlock'}>
               <img className="fullCard_big_image" src={this.state.activeImage || this.props.sprites.front_default}/>
               <div>
                  {
                        this.state.imageUrls.map((item, id) => {
                          return <img 
                            className={
                            this.state.activeImage === item
                            //|| this.props.sprites.front_default === item
                            ? 'fullCard_small_img fullCard_activeImage'
                            : 'fullCard_small_img'}
                            src={item}
                            key={id}
                            alt={'pokemon'}
                            onClick={this.handleClick}/>
                            //return <img className="small_img" src={item} key={id} alt={'pokemon'} onClick={this.handleClick}/>
                     })
                  }
               </div>
            </div>
            <div className="fullCard_info">
              <div>Main Information</div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Stat</th>
                    <th>Value</th>
                  </tr> 
                </thead>
                <tbody> 
                  <tr>
                    <td>ID:</td> 
                    <td>{this.props.id}</td>
                  </tr>
                  <tr>
                    <td>Height:</td> 
                    <td>{this.props.height}</td>
                  </tr>
                  <tr>
                    <td>Weight:</td> 
                    <td>{this.props.weight}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
            <div>Main Stats</div>
            <table className="table">
                <thead>
                  <tr>
                    <th>Stat</th>
                    <th>Value</th>
                  </tr> 
                </thead>
                <tbody> 
                  {
                    this.props.stats.map( (item, id ) => {
                    if(!item) {
                      return <tr><td>Something went wrong...</td></tr>
                    } 
                    return (
                    <tr key={id}>
                      <td>{item.stat.name}</td>
                      <td>
                      
                       <progress value={item.base_stat} max="100"/>
                       <span className="fullCard_progressDescription">{item.base_stat}</span>
                      </td>
                    </tr>
                    )
                  })
                  }
                </tbody>
              </table>
            </div>
            </div>
            <button className="btn btn-primary fullCard_close_button" onClick={this.props.closeCard}>Close</button>
      </div>
    )
  }
}
