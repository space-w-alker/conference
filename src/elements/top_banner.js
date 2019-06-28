import React from 'react'
import NavBar from './navbar'
import Button from './button'
import './top_banner.css'
import banner_image from '../images/top_banner1.jpg'
import design_streak from '../images/design_streaks.png'

class TopBanner extends React.Component{
  constructor(props){
    super(props)
    this.state = {showNavBanner:false}
    this.BannerRef = React.createRef();
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('scroll', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    
    this.setState({showNavBanner:!this.isOnScreen(this.BannerRef.current)})
  }

  isOnScreen(element){
    var rect = element.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;
    let isVisible;

    // Only completely visible elements return true:
    // isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }

  render(){
    let mainStyle = {height:450}
    let buttonStyle = {display:'block', textAlign:"center"}
    let titleTextStyle = {display:'inline-block'}
    let bannerOverlayStyle = {backgroundColor:'maroon', opacity:0.5}
    if(this.props.Dock){
      mainStyle.height = 150;
      buttonStyle.display = 'none';
      bannerOverlayStyle.backgroundColor = 'rgb(56, 0, 0)';
      bannerOverlayStyle.opacity = 0.9
      titleTextStyle.display = 'none';
    }
    return(
      <div className='Header' style={mainStyle}>
            <NavBar MobLimit={this.props.MobLimit} Width={this.props.Width} showNavBanner={this.state.showNavBanner} NavText={this.props.TitleText} Dock={this.props.Dock} height={this.state.width}/>
            <img className='BannerImage BannerOver' src={banner_image}></img>
            <img className='BannerStreakOverlay BannerOver' src={design_streak}/>
            <div className='BannerOverlay BannerOver' style={bannerOverlayStyle}/>
            <div className='BannerOver ElementsContainer AlignCenter' ref={this.BannerRef} > 
              <div style={{textAlign:"center"}}>
                <span className="TitleText" style={titleTextStyle}>{this.props.TitleText}</span>
              </div>
              <div style={buttonStyle}>
                <Button Text="SUBMISSION DETAILS"></Button>
              </div>
            </div>     
      </div>
    )
  }

}
export default TopBanner;