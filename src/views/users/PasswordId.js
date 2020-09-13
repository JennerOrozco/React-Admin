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
    let data = {pas: this.state.contraseña, id: this.props.match.params.id }
    
    let respon = await axios.post('http://localhost/Api/UpdPasswordById.php',data)    
    
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
                      <CLabel htmlFor="Name">Ingrese nueva contraseña</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name={"cil-user"} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput name="contraseña" size="100" type="password"  onChange={this.handleChange}  />
                        </CInputGroup>                        
                      </div>
                    </CFormGroup>

                    <div className="form-actions">
                      <CButton onClick={()=> this.ShowConf(true)}  color="primary">REESTABLECER CONTRASEÑA</CButton>                      
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
