import React from 'react';
import HomePage from './pages/home_page'
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'
import Submission from './pages/submission'
import SubInstructions from './pages/submission_instruction'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {width:0, height:0}
    this.mob_limit = 1000;
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight});
  }

  render() {
    // let appStyle = {height:`${this.state.height}`}
    let Sub = <Submission Width={this.state.width} MobLimit={this.mob_limit}/>
    return (
      <Router>
        <div>
          <Route exact path="/" render={(props)=><HomePage {...props} Width={this.state.width} MobLimit={this.mob_limit}/>}/>
          <Route exact path="/submission" render={(props)=><Submission {...props} Width={this.state.width} MobLimit={this.mob_limit}/>}/>
          <Route exact path="/submission_instructions" render={(props)=><SubInstructions {...props} Width={this.state.width} MobLimit={this.mob_limit}/>}/>
        </div>
      </Router>
    );
  }
}

export default App;
