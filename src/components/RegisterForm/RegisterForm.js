import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../redux/reducer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import './RegisterForm.css';
import {serviceCal} from '../../service/service';
let userEmail,userPass;
class RegisterForm extends Component {

  constructor(props) {
    super(props)
    this.state = {email:"",password:""}
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  render() {
    let {email, password} = this.state;
    let {isRegisterPending, isRegisterSuccess, registorError} = this.props;
    return (
      
      <MuiThemeProvider>
      <div>
      <AppBar
         title="Register"
       />
    <form name="loginForm" onSubmit={this.onSubmit}>
            <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange={e => this.setState({email: e.target.value})}
             value={email}
             />
            <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               value={password}
              onChange={e => this.setState({password: e.target.value})}
               />
        <input type="submit" value="Register" />

        <div className="message">
          { isRegisterPending && <div>Please wait...</div> }
          { isRegisterSuccess && <div>Success.</div> }
          { registorError && <div>{registorError.message}</div> }
        </div>
      </form>
         </div>
         </MuiThemeProvider>
    )
  }
  componentDidUpdate()
  {
    if(this.props.isRegisterSuccess)
    {
      setTimeout(() => {
        this.props.history.push('/login');
      }, 500);
      
    }
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    serviceCal.post(`https://reqres.in/api/register`,{method:"POST",headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },body:JSON.stringify(this.state)})
      .then((res) => res.json()).then((res) => {
         console.log(res)
         let { email, password } = this.state;
          userEmail = res.id;
          userPass = res.token;
          this.props.register(email, password, userEmail, userPass);
          this.setState({
            email: '',
            password: ''
          });
        })
  }
}

const mapStateToProps = (state) => {
  return {
    isRegisterPending: state.isRegisterPending,
    isRegisterSuccess: state.isRegisterSuccess,
    registorError: state.registorError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (email, password, userEmail, userPass) => dispatch(register(email, password, userEmail, userPass))
  };
}
const style = {
  margin: 15,
 };

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);