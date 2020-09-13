import React, { Component } from 'react'
import {  
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,  
  CForm,
  CFormGroup,
  CInput,  
  CInputGroup,  
  CInputGroupPrepend,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,  
  CInputGroupText,
  CLabel,      
  CRow
} from '@coreui/react'
import rolesData from './Roles'
import CIcon from '@coreui/icons-react'
const axios = require('axios');

class  User extends Component {
  
    state = {
      agregar : false,   
      user: {ID:"",Usuario:"",Nombre:"Jenner",Apellido:"",Estado:"",Correo:"",Password:"",Rol_ID:""},
      data : []
    }  

  
  componentDidMount(){
    this.fecthNav()
  }  

  fecthNav = async () => {
    
    let  roles = await rolesData()    
    
    let data = {ID: this.props.match.params.id}

    let user = await  axios.post(`http://localhost/Api/getUserApiById.php`,data)
    let respuesta = [];
    if (user.data === 'Error'){
      respuesta = [] 
    }else{
      respuesta = user.data[0]
    }
    
    this.setState({
      data: roles,
      user: respuesta,
      new: user.data[0].Domain || false

    })

    document.getElementsByName('Domain')[0].value = user.data[0].Domain || ''
    document.getElementsByName('Placement')[0].value = user.data[0].Placement || ''
    document.getElementsByName('Porcentaje')[0].value = user.data[0].Porcentaje || ''    
    
  }
  

  setPosition= (e)=> {
    this.setState( {
      [e.target.name]: e.target.value
    })
  }

  handleChange= (e)=> {    
    this.setState( {
      user: {...this.state.user,[e.target.name]: e.target.value}
    })
  }


  ShowError(show,agregar) {
    this.setState({
      agregar: show   
    })
    

    if (agregar){
      this.Agregar()
    }
  }

  async Agregar(show,agregar) {
    
    let data = {ID: this.props.match.params.id, Domain: this.state.user.Domain , Placement: this.state.user.Placement,Porcentaje: this.state.user.Porcentaje,New: this.state.new}
    console.log(data,'QUE')
    let respon = await axios.post('http://localhost/Api/UpdUserConf.php',data)    
    
    if (respon.data){
      this.props.history.push('/Usuarios')
    }
  }
  



  
 render () {
  return (  
      <CRow>
        
        <CModal 
        show={this.state.agregar} 
        onClose={() => !true}
        color="success"
        size="sm"
      >
        <CModalHeader closeButton>
          <CModalTitle>Agregar Configuracion</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ¿Esta seguro de querer agregar esta configuracion al usuario?
        </CModalBody>
        <CModalFooter>                
        <CButton color="warning" onClick={()=> this.ShowError(false,false)}>Cancelar</CButton>
          <CButton color="success" onClick={()=> this.ShowError(false,true)}>Aceptar</CButton>
        </CModalFooter>
      </CModal>

        <CCol xs="12">
          
            <CCard>
              <CCardHeader>
                Configuracion de API
                <div className="card-header-actions">                  
                  <CButton 
                    color="link" 
                    className="card-header-action btn-minimize" 
                  >
                  <CIcon  />
                  </CButton>                  
                </div>
              </CCardHeader>
              
                <CCardBody>
                  <CForm className="form-horizontal">
                    <CFormGroup>
                      <CLabel htmlFor="Name"> Dominio</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name={"cil-user"} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput name="Domain" size="100" type="text"  onChange={this.handleChange} />
                        </CInputGroup>                        
                      </div>
                    </CFormGroup>


                    <CFormGroup>
                      <CLabel htmlFor="prependedInput"> Placement</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name={"cil-user"} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput name="Placement" size="100" type="text"  onChange={this.handleChange}  />
                        </CInputGroup>                        
                      </div>
                    </CFormGroup>


                    <CFormGroup>
                      <CLabel htmlFor="prependedInput"> Porcentaje</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name={"cil-user"} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput  name="Porcentaje" size="100" type="text"  onChange={this.handleChange}  />
                        </CInputGroup>                        
                        
                      </div>
                    </CFormGroup>


                   

                    <div className="form-actions">
                      <CButton onClick={()=> this.ShowError(true)}  color="primary">MODIFICAR CONFIGURACION</CButton>                      
                    </div>
                  </CForm>
                </CCardBody>
            </CCard>
        </CCol>
      </CRow>
  )
}
}

export default User
