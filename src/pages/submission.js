import React from 'react'
import TopBanner from '../elements/top_banner'
import Footer from '../elements/footer'
import Button from '../elements/button'
import './submission.css'
import { ReactComponent as UserIcon } from '../icons/user_icon.svg'
import { ReactComponent as CompanyIcon } from '../icons/company_icon.svg'
import { ReactComponent as CompanyEmail } from '../icons/email_icon.svg'
import { ReactComponent as PhoneIcon } from '../icons/phone_icon.svg'
import { ReactComponent as Location } from '../icons/location_icon.svg'
import { ReactComponent as UsersIcon } from '../icons/users_icon.svg'
import { arrayExpression } from '@babel/types';
import { concat } from 'rxjs';

class Submission extends React.Component {
  constructor(props) {
    super(props)
    this.TITLE_TEXT = 'Submission Form';
    this.state = { productCount: 1, invalidate: false }
    this.InvalidateForms = this.InvalidateForms.bind(this);
  }

  AddProduct() {
    this.setState({ productCount: this.state.productCount + 1 })
  }

  InvalidateForms(e) {
    this.setState({ invalidate: true });
    e.preventDefault();
  }

  render() {

    return (
      <div className="SubContainer">
        <TopBanner TitleText={this.TITLE_TEXT} Dock={true} Width={this.props.Width} MobLimit={this.props.MobLimit}/>
        <form method='GET' action='./sub.php'>
          <div className={`InfoCard${this.props.Width<this.props.MobLimit?" InfoCardSmall":""}`}>
            <h1>General Infomation</h1>
            <div className='SubBody'>
              <TextForm name="company_name" Label='Company Name' IconType='CompanyIcon' type='text' flex='1 400px' invalidate={this.state.invalidate} />
              <TextForm name="full_address" Label='Full Address' IconType='LocationIcon' type='text' flex='1 400px' />
              <TextForm name="company_email" Label='Company Email' IconType='EmailIcon' type='email' flex='1 400px' />
              <TextForm name="company_contact_person" Label="Company Contact Person's Name" IconType='UserIcon' type='text' flex='1 400px' />
              <TextForm name="company_contact_person_mail" Label="Company Contact Person's Email" IconType='EmailIcon' type='email' flex='1 400px' />
              <TextForm name="company_contact_person_phone" Label="Company Contact Person's Phone" IconType='PhoneIcon' type='text' flex='1 400px' />
              <TextForm name="num_of_company_staff" Label="Number of company staff that would be attening the fair" IconType='UsersIcon' type='number' flex='1 100%' />
              <ProductDetails />
            </div>
          </div>
          <div className={`InfoCard${this.props.Width<this.props.MobLimit?" InfoCardSmall":""}`}>
            <h1>Payment Mode and Conditions</h1>
          </div>
          <div className={`InfoCard${this.props.Width<this.props.MobLimit?" InfoCardSmall":""}`}>
            <h1></h1>
          </div>
          <div className={`InfoCard${this.props.Width<this.props.MobLimit?" InfoCardSmall":""}`}>
            <Button Text="Submit Details" />
          </div>
        </form>

        <Footer />
      </div>
    )
  }
}

class TextForm extends React.Component {
  constructor(props) {
    super(props)
    this.Input = React.createRef();
    this.state = { Text: "", focusState: "", errorList: [], IconFocused: "", ready: true }
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validate = this.validate.bind(this);
  }

  validate(e) {
    let newList = []
    let val = ""
    switch (this.props.type) {
      case 'text':
        val = this.isEmpty();
        if (val !== "") {
          newList.push(val);
        }
        break;
      case 'email':
        val = this.isEmpty();
        if (val !== "") {
          newList.push(val);
        }
        val = this.isValidEmail();
        if (val !== "") {
          newList.push(val);
        }
      default:
        break;
    }
    this.setState({ errorList: newList })

  }


  handleUpdateInput(e) {
    this.setState({ Text: this.Input.current.value });

  }

  handleFocus(e) {
    this.setState({ focusState: 'Focused', IconFocused: 'IconFocused' })
  }

  handleBlur(e) {
    this.setState({ focusState: '', IconFocused: '' })
    if (true || this.props.invalidate) {
      this.validate();
    }
  }

  isNumber() {
    if (isNaN(this.state.Text)) {
      let newList = this.state.errorList.concat();
      newList.push("This field must be a valid number")
      this.setState({ errorList: newList })
    }
  }

  isEmpty() {
    if (this.state.Text === "") {
      return ("This field is required")
    }
    return "";
  }

  isValidEmail() {
    let regex = /\S@\S+\.\S+/g;
    // let bol = regex.Search(this.state.Text);
    let bol = this.state.Text.search(regex);
    if (bol === -1) {

      return ("This field must be a valid E-mail address")
    }
    return "";
  }


  render() {
    let companyIcon = <CompanyIcon className={`Icon ${this.state.IconFocused} ${this.state.errorList.length === 0 ? "" : "IconError"}`} />
    let emailIcon = <CompanyEmail className={`Icon ${this.state.IconFocused} ${this.state.errorList.length === 0 ? "" : "IconError"}`} />
    let userIcon = <UserIcon className={`Icon ${this.state.IconFocused} ${this.state.errorList.length === 0 ? "" : "IconError"}`} />
    let usersIcon = <UsersIcon className={`Icon ${this.state.IconFocused} ${this.state.errorList.length === 0 ? "" : "IconError"}`} />
    let location = <Location className={`Icon ${this.state.IconFocused} ${this.state.errorList.length === 0 ? "" : "IconError"}`} />
    let phoneIcon = <PhoneIcon className={`Icon ${this.state.IconFocused} ${this.state.errorList.length === 0 ? "" : "IconError"}`} />
    let icon = undefined;

    switch (this.props.IconType) {
      case 'CompanyIcon':
        icon = companyIcon;
        break;
      case 'EmailIcon':
        icon = emailIcon;
        break;
      case 'UserIcon':
        icon = userIcon;
        break;
      case 'UsersIcon':
        icon = usersIcon;
        break;
      case 'PhoneIcon':
        icon = phoneIcon;
        break;
      case 'LocationIcon':
        icon = location;
        break;
      default:
        break;
    }
    let textinput = <input name={this.props.name} className={`InputStyle`} ref={this.Input} type={this.props.type} value={this.state.Text} onChange={this.handleUpdateInput} onFocus={this.handleFocus} onBlur={this.handleBlur} />
    let textarea = <textarea name={this.props.name} className={`InputStyle TextAreaStyle`} ref={this.Input} type={this.props.type} value={this.state.Text} onChange={this.handleUpdateInput} onFocus={this.handleFocus} onBlur={this.handleBlur} />
    let MainContainerStyle = { flex: this.props.flex }
    return (
      <div className="MainContainer" style={MainContainerStyle}>

        <label>{this.props.Label}</label>
        <div className={`InputContainer ${this.state.focusState}`}>
          <div style={{ display: 'inline-block', width: '20px', height: '20px', margin: 5 }}>
            {icon}
          </div>
          {this.props.textarea ? textarea : textinput}
        </div>
        <div className={`ErrorDisplay ${this.state.errorList.length === 0 ? "ErrorHidden" : ""}`}>
          <ul>
            {this.state.errorList.map((val, id) => {
              return (<li key={id}>{val}</li>);
            }
            )}
          </ul>
        </div>
      </div>
    )
  }
}

class ProductDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 1, isWeatherSensitive: false }
    this.AddProduct = this.AddProduct.bind(this);
    this.RemoveProduct = this.RemoveProduct.bind(this);
    this.HandleIsSensitive = this.HandleIsSensitive.bind(this);
  }

  AddProduct(e) {
    if (this.state.count == 5) return;
    this.setState({ count: this.state.count + 1 });
    e.preventDefault();
  }

  RemoveProduct(e) {
    if (this.state.count == 1) return;
    this.setState({ count: this.state.count - 1 })
    e.preventDefault();
  }

  HandleIsSensitive(e) {
    console.log(e.target.id);
  }

  renderProducts() {
    let arr = [];
    for (let i = 0; i < this.state.count; i++) {
      arr.push(0)

    }
    return (
      arr.map((val, id) => (
        <React.Fragment key={id}>
          <TextForm name={`product_name${id + 1}`} Label={`Product Name #${id + 1}`} Icon={undefined} type='text' flex='1 100%' />
          <TextForm name={`product_details${id + 1}`} Label={`Product Details #${id + 1}`} Icon={undefined} type='text' flex='1 100%' textarea={true} />
          <div style={{ flex: '1 100%', boxSizing: 'border-box', margin: '15px 5px' }}>
            <label>Product weather sensitive?</label>
            &nbsp;&nbsp;
                            <label>Yes</label>
            <input type='radio' name={`isSensitive${id}`} id='yes' value='yes' onChange={this.HandleIsSensitive} />
            &nbsp;&nbsp;
                            <label>No</label>
            <input type='radio' name={`isSensitive${id}`} id='no' value='no' onChange={this.HandleIsSensitive} />
          </div>
          <div style={{ flex: '1 100%', boxSizing: 'border-box', margin: '15px 5px' }}>
            <label>Product Patented?</label>
            &nbsp;&nbsp;
                            <label>Yes</label>
            <input type='radio' name={`isPatented${id}`} id='yes' value='yes' onChange={this.HandleIsSensitive} />
            &nbsp;&nbsp;
                            <label>No</label>
            <input type='radio' name={`isPatented${id}`} id='no' value='no' onChange={this.HandleIsSensitive} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If "No" <b>Please contact Research and Innovation Office, University of Lagos</b>

          </div>
        </React.Fragment>)
      )
    )
  }

  render() {
    return (
      <React.Fragment>
        {
          this.renderProducts()
        }

        <Button Text="Add Product" EventHandler={this.AddProduct} />
        <Button Text="Remove Product" EventHandler={this.RemoveProduct} />

      </React.Fragment>
    )
  }
}

export default Submission