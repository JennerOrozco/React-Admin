import React, { Component } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
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


class BasicForms extends Component {

  componentDidMount(){
    this.fecthNav()
  }  

  fecthNav = async () => {
    
    let  roles = await rolesData()                      
    let empty = [{Rol_ID: 0,Descripcion: ''}]
    roles.forEach(element => {
      empty.push(element)
    });
    
    this.setState({
      data: empty
    })
  }

  state = {
    agregar : false,    
    data : []
  }  

  setPosition= (e)=> {
    this.setState( {
      [e.target.name]: e.target.value
    })
  }

  handleChange= (e)=> {
    this.setState( {
      [e.target.name]: e.target.value
    })
  }

  
  handleChangeSelec= (e)=> {
    this.setState( {'ROL': e.target.value
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

    let data = {Nombre: this.state.Nombre,Apellido: this.state.Apellido,Usuario: this.state.Usuario,CorreoElectronico: this.state.CorreoElectronico,Contraseña: this.state.Contraseña,Rol_ID: this.state.ROL}
    
    let respon = await axios.post('http://localhost/Api/addUser.php',data)    
    
    if (respon.data){
      console.log(respon.data)
      this.props.history.push('/User/Api/' + respon.data)
    }
  }
  


    

  render (){
  return (    

      <CRow>
        
        <CModal 
        show={this.state.agregar} 
        onClose={() => !true}
        color="success"
        size="sm"
      >
        <CModalHeader closeButton>
          <CModalTitle>Agregar Usuario</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ¿Esta seguro de querer ingresar el usuario.?
        </CModalBody>
        <CModalFooter>                
        <CButton color="warning" onClick={()=> this.ShowError(false,false)}>Cancelar</CButton>
          <CButton color="success" onClick={()=> this.ShowError(false,true)}>Aceptar</CButton>
        </CModalFooter>
      </CModal>

        <CCol xs="12">
          
            <CCard>
              <CCardHeader>
                Agregar Usuario
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
                      <CLabel htmlFor="Name">Ingrese Nombre</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name={"cil-user"} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput name="Nombre" size="100" type="text"  onChange={this.handleChange}  />
                        </CInputGroup>                        
                      </div>
                    </CFormGroup>


                    <CFormGroup>
                      <CLabel htmlFor="prependedInput">Ingrese Apellido</CLabel>
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
                      <CLabel htmlFor="prependedInput">Ingrese Usuario</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name={"cil-user"} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput name="Usuario" size="100" type="text"  onChange={this.handleChange}  />
                        </CInputGroup>
                        
                        <p className="help-block" style={{color: 'red'}} id="usuario">Sugerencia de usuario</p>
                      </div>
                    </CFormGroup>

                    <CFormGroup>
                      <CLabel htmlFor="prependedInput">Ingrese Correo Electronico</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>@</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput name="CorreoElectronico" size="100" type="email"  onChange={this.handleChange}  />
                        </CInputGroup>                        
                      </div>
                    </CFormGroup>
                    
                    

                    <CFormGroup>
                      <CLabel htmlFor="prependedInput">Ingrese Contraseña Temporal</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name={"cil-warning"} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput name="Contraseña" size="100" type="password"  onChange={this.handleChange}  />
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
                      <CButton onClick={()=> this.ShowError(true)}  color="primary">AGREGAR USUARIO</CButton>                      
                    </div>
                  </CForm>
                </CCardBody>
            </CCard>
        </CCol>
      </CRow>
  )
}
}

export default BasicForms
