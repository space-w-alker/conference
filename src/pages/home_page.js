import React from 'react';
import TopBanner from '../elements/top_banner'
import InfoDisplay from '../elements/infodisplay'
import Footer from '../elements/footer'
import './home_page.css';



class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, scrollHeight: 0, scrollTop: 5, showNavBanner: false };
    this.TITLE_TEXT = '14th University of Lagos Annual Research Conference and Fair';
    this.INFO = ['Location', 'Phone', 'Calender'];
    this.HOME_TEXT = 'The 14th annual University of Lagos Research Conference takes place on the 21 to the 23 of August, 2019 at the University of Lagos Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
  }



  render() {
    let appStyle = { height: `${this.state.height}` }
    return (
      <div className='HomePage'>

        <TopBanner TitleText={this.TITLE_TEXT} Dock={false} Width={this.props.Width} MobLimit={this.props.MobLimit} />
        <div className={`InfoCard${this.props.Width < this.props.MobLimit ? " InfoCardSmall" : ""}`}>
          <h1>Home</h1>
          <div>
            {this.HOME_TEXT}
          </div>
        </div>
        <div className={`InfoCard${this.props.Width < this.props.MobLimit ? " InfoCardSmall" : ""}`}>
          <h1>Info</h1>
          <div className='InfoContainer'>
            {this.INFO.map((val, id) => {
              return (<InfoDisplay Type={val} key={id}/>)
            })}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default HomePage;
