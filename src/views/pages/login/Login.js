import React, { Component } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
const axios = require('axios');
class Login extends Component {
  
  state = {
    modal : false,    
    error : false,    
      user : '',
      password : ''
    
  }  

  state = {
    data : [],
    objetoSend: {},
    dates: []
  }  
  
  componentDidMount(){
    this.fecthNav()
  }  
  
  fecthNav = async () => {
    await  axios.get(`http://localhost/Api/LogOut.php`)

  }

  ShowModal(show) {
      this.setState({
        modal: show   
      })
  }

  
  ShowError(show) {
    this.setState({
      error: show   
    })
}

  handleChange= (e)=> {
    this.setState( {
      [e.target.name]: e.target.value
    })
  }

   Login = async ()=>  {
    let data = {user : this.state.user,password: this.state.password }
    let respon = await axios.post('http://localhost/Api/Login.php',data)    
    if (respon.data){
      this.props.history.push('/Dashboard')
    }else{
      this.setState({
        error: true
      })
    }
  }


  
   
  
  render() {return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        
        <CRow className="justify-content-center">

        <CModal 
              show={this.state.modal} 
              onClose={() => !true}
              color="info"
            >
              <CModalHeader closeButton>
                <CModalTitle>Reestablecer Contraseña</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Estimado usuario, Comuniquese con el administrador para que su contraseña sea reestablecida.
              </CModalBody>
              <CModalFooter>                
                <CButton color="info" onClick={()=> this.ShowModal(false)}>OK</CButton>
              </CModalFooter>
            </CModal>



            <CModal 
              show={this.state.error} 
              onClose={() => !true}
              color="danger"
              size="sm"
            >
              <CModalHeader closeButton>
                <CModalTitle>Error</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Ha ingresado un usuario o contraseña incorrecta intente nuevamente.
              </CModalBody>
              <CModalFooter>                
                <CButton color="danger" onClick={()=> this.ShowError(false)}>OK</CButton>
              </CModalFooter>
            </CModal>



          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>EC - CASH MONEY</h1>
                    <p className="text-muted">Ingresa tus credenciales</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" onChange={this.handleChange} name="user" placeholder="Usuario" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" onChange={this.handleChange} name="password" placeholder="Contraseña" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton  onClick={this.Login} color="primary" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-center">                      
                        <CButton onClick={()=> this.ShowModal(true)} color="link" className="px-0">Olvidaste tu contraseña?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )}
}



export default Login
