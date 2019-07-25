import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/reducer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import './LoginForm.css';
import {serviceCal} from '../../service/service';
    
let userPass;
class LoginForm extends Component {

  constructor(props) {
    super(props);
    
      if(!this.props.isRegisterSuccess)
      {
        this.props.history.push('/')
      }
    console.log(this.props)
    this.state = {registred:false};
    this.onSubmit = this.onSubmit.bind(this);
  }
  render() {
    let {email, password} = this.state;
    let {isLoginPending, isLoginSuccess, loginError} = this.props;
    return (
      
      <MuiThemeProvider>
      <div>
      <AppBar
         title="Login"
         showMenuIconButton={false}
       />
    <form name="loginForm" onSubmit={this.onSubmit}>
            <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange={e => this.setState({email: e.target.value})}
             value={email}
             />
            {/* <input type="text" name="email" onChange={e => this.setState({email: e.target.value})} value={email}/>
           */}
            <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               value={password}
              onChange={e => this.setState({password: e.target.value})}
               />
            {/* <input type="password" name="password" onChange={e => this.setState({password: e.target.value})} value={password}/>
           */}
        <input type="submit" value="Login" />

        <div className="message">
          { isLoginPending && <div>Please wait...</div> }
          { isLoginSuccess && <div>Success.</div> }
          { loginError && <div>{loginError.message}</div> }
        </div>
      </form>
         </div>
         </MuiThemeProvider>
    )
  }
  componentDidUpdate()
  {
    if(this.props.isLoginSuccess)
    {
      setTimeout(() => {
        this.props.history.push('/home');
      }, 500);
      
    }
  }
  onSubmit(e) {
    e.preventDefault();
    serviceCal.post(`https://reqres.in/api/login`,{method:"POST",headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },body:JSON.stringify(this.state)})
      .then((res) => res.json()).then((res) => {
         console.log(res)
         let { email, password } = this.state;
          userPass = res.token;
          this.props.login(email, password, userPass);
          this.setState({
            email: '',
            password: ''
          });
        })
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError,
    isRegisterSuccess:state.isRegisterSuccess,
    isRegisterPending:state.isRegisterPending,
    registerError:state.registerError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password, userPass) => dispatch(login(email, password, userPass))
  };
}
const style = {
  margin: 15,
 };

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);