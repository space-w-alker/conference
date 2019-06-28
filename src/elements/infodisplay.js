import React from 'react'
import './infodisplay.css'
import { ReactComponent as PhoneIcon } from '../icons/phone_icon.svg'
import { ReactComponent as LocationIcon } from '../icons/location_icon.svg'
import { ReactComponent as CalenderIcon } from '../icons/calender_icon.svg'

class InfoDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {mouseOver:false}
    this.image = undefined;
    this.color = undefined;
    this.link = '#'
    this.text = "Default"
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleMouseEnter(){
    this.setState({mouseOver:true})
  }
  handleMouseLeave(){
    this.setState({mouseOver:false})
  }

  render() {
    switch (this.props.Type) {
      case 'Location':
        this.image = <LocationIcon className='BackImage Cover'/>;
        this.color = "Red";
        this.text = "Univerity of Lagos, Nigeria"
        break;
      case 'Phone':
        this.image = <PhoneIcon className='BackImage Cover'/>;
        this.color = "Blue"
        this.text = "090-xxxx-xxxx"
        break;
      case 'Calender':
        this.image = <CalenderIcon className='BackImage Cover'/>;
        this.color = "Green";
        this.text = "21-23 August, 2019"
        break;
      default:
        break;
    }
    return (
      <div className={`SingleInfoContainer ${this.color}`} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        {this.image}
        <div className={`InfoTextStyle`}>
          {this.text}
        </div>
      </div>
    )
  }
}

export default InfoDisplay;