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

    let user = await  axios.post(`http://localhost/Api/getUserById.php`,data)
    
    
    
    this.setState({
      data: roles,
      user: user.data[0]

    })

    document.getElementsByName('Nombre')[0].value = user.data[0].Nombre
    document.getElementsByName('Apellido')[0].value = user.data[0].Apellido
    document.getElementsByName('Usuario')[0].value = user.data[0].Usuario
    document.getElementsByName('CorreoElectronico')[0].value = user.data[0].Correo    
    
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

  
  handleChangeSelec= (e)=> {
    this.setState( {
      user: {...this.state.user,'Rol_ID': e.target.value}
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
    
    let data = {ID: this.state.user.ID,Nombre: this.state.user.Nombre,Apellido: this.state.user.Apellido,CorreoElectronico: this.state.user.CorreoElectronico,Rol_ID: this.state.user.Rol_ID}
    
    let respon = await axios.post('http://localhost/Api/UpdUser.php',data)    
    
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
          <CModalTitle>Modificar Usuario</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ¿Esta seguro de querer modificar el usuario.?
        </CModalBody>
        <CModalFooter>                
        <CButton color="warning" onClick={()=> this.ShowError(false,false)}>Cancelar</CButton>
          <CButton color="success" onClick={()=> this.ShowError(false,true)}>Aceptar</CButton>
        </CModalFooter>
      </CModal>

        <CCol xs="12">
          
            <CCard>
              <CCardHeader>
                Modificar Usuario
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
                      <CLabel htmlFor="Name"> Nombre</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name={"cil-user"} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput name="Nombre" size="100" type="text"  onChange={this.handleChange} />
                        </CInputGroup>                        
                      </div>
                    </CFormGroup>


                    <CFormGroup>
                      <CLabel htmlFor="prependedInput"> Apellido</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name={"cil-user"} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput name="Apellido" size="100" type="text"  onChange={this.handleChange}  />
                        </CInputGroup>                        
                      </div>
                    </CFormGroup>


                    <CFormGroup>
                      <CLabel htmlFor="prependedInput"> Usuario</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name={"cil-user"} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput disabled name="Usuario" size="100" type="text"  onChange={this.handleChange}  />
                        </CInputGroup>                        
                        
                      </div>
                    </CFormGroup>

                    <CFormGroup>
                      <CLabel htmlFor="prependedInput"> Correo Electronico</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>@</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput name="CorreoElectronico" size="100" type="email"  onChange={this.handleChange}   />
                        </CInputGroup>                        
                      </div>
                    </CFormGroup>
                    
                    

                   


                    <CFormGroup>
                      <CLabel htmlFor="prependedInput">Seleccione el ROL del usuario</CLabel>
                      
                      <select
                        className="form-control"                        
                        onChange={this.handleChangeSelec}
                        >
                          {
                            this.state.data.map((i)=>(
                              <option key={i.Rol_ID} value={i.Rol_ID}>{i.Descripcion}</option>
                            ))
                          }
                        </select>
                    </CFormGroup>

                   

                    <div className="form-actions">
                      <CButton onClick={()=> this.ShowError(true)}  color="primary">MODIFICAR USUARIO</CButton>                      
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
