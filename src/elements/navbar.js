import React from 'react';
import './navbar.css'
import logo from '../images/LOGO.png'
import {NavLink as NavLink} from 'react-router-dom'
import { ReactComponent as OptionsIcon } from '../icons/options_icon.svg'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.options = ['Home', 'Submission Instructions', 'Submit'];
    this.paths = ['/', '/submission_instructions', 'submission']
    this.state = {Collapsed:true}
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.setState({Collapsed:!this.state.Collapsed})
  }
  render() {
    let navBarBackground = { backgroundColor: "transparent" }
    let TextDisplay = { display: 'none' }
    if (this.props.showNavBanner) {
      navBarBackground.backgroundColor = 'brown';
      TextDisplay = { display: 'inline' }
    }
    if (this.props.Dock) {
      TextDisplay.display = 'inline';
      // navBarBackground.backgroundColor = 'rgba(165, 42, 42, 0.9)'
    }
    return (
      <div className='NavBar' style={navBarBackground}>
        <img src={logo} style={this.imageStyle} className="Logo" />
        <div style={{ flex: 1, flexGrow: 1, textAlign: 'center', padding:'30px' }}>
          <span style={TextDisplay} className='TextDisplay'>{this.props.NavText}</span>
        </div>
        {this.options.map((val, id) => {
          return <div key={id} className={`NavBarItem NavBarItem_${id}${this.props.Width<this.props.MobLimit?" NavBarItemSmall":""} ${this.state.Collapsed&&this.props.Width<this.props.MobLimit?" NavBarItemHidden":""}`}>
            <NavLink exact={val === 'Home'} to={this.paths[id]} className="LinkStyle">
              {val}
            </NavLink>
          </div>
        })}
        <OptionsButton handleClick={this.handleClick} Width={this.props.Width} MobLimit={this.props.MobLimit}/>
      </div>

    );
  }
}

class OptionsButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isMouseOver:false}
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseExit = this .handleMouseExit.bind(this);
  }
  handleMouseEnter(){
    this.setState({isMouseOver:true})
  }
  handleMouseExit(){
    this.setState({isMouseOver:false})
  }

  render() {
    return (
      <div className={`OptionsContainer${this.state.isMouseOver?" OpMouseOver":""}${this.props.Width<this.props.MobLimit?"":" OpHidden"}`} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseExit} onClick={this.props.handleClick}>
        <OptionsIcon className='OptionsIcon'/>
      </div>)
  }
}

export default NavBar;