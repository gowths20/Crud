import React , { Component } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { logout } from '../../redux/reducer';
import {serviceCal} from '../../service/service';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Button from '@material-ui/core/Button';
class App extends Component {
  
  constructor(props)
  {
    super(props);
    console.log(this.props)
    if(this.props.isRegisterSuccess)
    {
      if(this.props.isLoginSuccess)
      {

      }
      else
      {
        this.props.history.push('/home');
      }
    }
    else
    {
      this.props.history.push('/');
      
    }
    this.state = {
      registered:false
    }  
    this.LogOut = this.logout.bind(this);
  }
  logout()
  {
    this.props.dispatch(logout());
    this.props.history.push('/');
  }
  componentDidMount() {
    console.log(serviceCal)
    serviceCal.get('http://dummy.restapiexample.com/api/v1/employees')
      .then((res) => res.json()).then((res) => {
        this.data = res;
        this.data.length = 10;
        console.log(this.data)
        this.setState({ registered:true });
        },this)
  } 
  render()
  {
    
    return(
      this.state.registered?<MuiThemeProvider><AppBar showMenuIconButton={false} title = "DashBoard"><Button onClick = {this.LogOut} color="inherit">Logout</Button></AppBar><MaterialTableDemo model = {this.data} /></MuiThemeProvider>:null
    )
  }
}
function MaterialTableDemo(props) {
  console.log(props.model)
  const [state, setState] = React.useState({
    columns: [
      { title: 'id', field: 'id',  type: 'numeric'},
      { title: 'employee_name', field: 'employee_name' },
      { title: 'employee_age', field: 'employee_age', type:'numeric' },
      { title: 'employee_salary', field: 'employee_salary' },
    ],
    data:props.model
  });

  return (
    <MaterialTable
      title="Employee Record"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          }),
      }}
    />
  );
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

export default connect(mapStateToProps)(App)