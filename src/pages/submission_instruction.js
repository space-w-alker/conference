import React from 'react'
import TopBanner from '../elements/top_banner'
import Footer from '../elements/footer'
import './submission_instruction.css'

class SubmissionInstruction extends React.Component{
  constructor(props){
    super(props)
    this.TITLE_TEXT = 'Submission Instructions';
  }

  render(){
    return(
    <div className="SubInsContainer">
      <TopBanner TitleText={this.TITLE_TEXT} Dock={true} Width={this.props.Width} MobLimit={this.props.MobLimit}/>
      <div className='SubInsBody'>
        what is happening
      </div>
      <Footer/>
    </div>
    )
  }
}

export default SubmissionInstruction