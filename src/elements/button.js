import React from 'react';
import './button.css';

class Button extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div style={{display:"inline", textAlign:"center"}}>
        <button className='Button' onClick={this.props.EventHandler}>{this.props.Text}</button>
      </div>
    );
  }
}
export default Button;