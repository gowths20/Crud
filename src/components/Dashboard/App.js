import React , { Component } from 'react';
import MaterialTable from 'material-table';
import {serviceCal} from '../../service/service';

class App extends Component {
  
  constructor()
  {
    super();
    this.state = {
      registered:false
    }  
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
      this.state.registered?<MaterialTableDemo model = {this.data} />:null
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
      title="Editable Example"
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
export default App