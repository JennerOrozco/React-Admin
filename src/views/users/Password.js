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
import CIcon from '@coreui/icons-react'
const axios = require('axios');

class BasicForms extends Component {

  state = {
    agregar : false
    
  }  

  handleChange= (e)=> {
    this.setState( {
      [e.target.name]: e.target.value
    })
  }

    
  ShowConf(show,agregar) {
    this.setState({
      agregar: show   
    })

    if (agregar){
      this.Agregar()
    }
  }


  async Agregar(show,agregar) {
    let data = {pas: this.state.contraseñaActual,pasNew: this.state.contraseñaNueva,pasConf: this.state.contraseñaConfirmacion}
    
    let respon = await axios.post('http://localhost/Api/UpdPassword.php',data)    
    
    if (respon.data){
      this.props.history.push('/Dashboard')
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
          <CModalTitle>Cambiar contraseña</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ¿Esta seguro de querer modificar su contraseña?
        </CModalBody>
        <CModalFooter>                
        <CButton color="warning" onClick={()=> this.ShowConf(false,false)}>Cancelar</CButton>
          <CButton color="success" onClick={()=> this.ShowConf(false,true)}>Aceptar</CButton>
        </CModalFooter>
      </CModal>

        <CCol xs="12">
          
            <CCard>
              <CCardHeader>
                Cambiar Contraseña
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
                      <CLabel htmlFor="Name">Ingrese contraseña actual</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name={"cil-user"} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput name="contraseñaActual" size="100" type="password"  onChange={this.handleChange}  />
                        </CInputGroup>                        
                      </div>
                    </CFormGroup>


                    <CFormGroup>
                      <CLabel htmlFor="prependedInput">Ingrese nueva contraseña</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name={"cil-user"} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput name="contraseñaNueva" size="100" type="password"  onChange={this.handleChange}  />
                        </CInputGroup>                        
                      </div>
                    </CFormGroup>


                    <CFormGroup>
                      <CLabel htmlFor="prependedInput">Confirmacion de Contraseña</CLabel>                      
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name={"cil-user"} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput name="contraseñaConfirmacion" size="100" type="password"  onChange={this.handleChange}  />
                        </CInputGroup>                        
                    </CFormGroup>

                    <div className="form-actions">
                      <CButton onClick={()=> this.ShowConf(true)}  color="primary">MODIFICAR CONTRASEÑA</CButton>                      
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
