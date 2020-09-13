import React, { Component } from 'react';

import Users from  './Users'
import userData from './UsersData'

class Usuarios extends Component {

  state = {
    data : []
  }  
 
    componentDidMount(){
      this.fecthNav()
    }  

    fecthNav = async () => {
      // eslint-disable-next-line
      let  datos = await userData()      
      this.setState({
        data: datos
      })
    }

  render(){
    return (
      <div>
        <Users value={this.state.data}/>
      </div>
    )
  }
}

export default  Usuarios
