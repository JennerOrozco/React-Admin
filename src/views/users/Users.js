import React, { useState, useEffect } from 'react'

import { useHistory, useLocation } from 'react-router-dom'
import {  
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const getBadge = status => {
  switch (status) {
    case '1': return 'success'
    case '0': return 'danger'    
    default: return 'success'
  }
}


const eliminar = async ID => {
  const axios = require('axios');
  let data = {ID: ID}      
  await axios.post('http://localhost/Api/DelUser.php',data)    
  window.location.reload(false);
}


const getBadgeName = status => {
  switch (status) {
    case '1': return 'Activo'
    case '0': return 'Inactvio'    
    default: return 'Activo'
  }
}

const Users = (Data) => {
  let usersData = Data.value;  
  console.log(usersData)
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Lista de Usuarios
            
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={usersData}
            fields={['Usuario','Nombre','Apellido', 'Correo', 'Estado','Opciones']}
            hover            
            striped  
            responsive = {false}
            clickableRows            
            scopedSlots = {{
              'Estado':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.Estado)}>
                      {getBadgeName(item.Estado)}
                    </CBadge>
                  </td>
                )
                ,'Opciones':
                (item)=>(
                  <td>
                  <CDropdown>
                    <CDropdownToggle>
                      <CIcon name="cil-settings"/>
                    </CDropdownToggle>
                    <CDropdownMenu  style={{position: 'absolute'}}className="pt-0" >
                      <CDropdownItem onClick={() => history.push(`/User/Api/${item.ID}`)} >Configuracion de API</CDropdownItem>
                      <CDropdownItem onClick={() => history.push(`/users/${item.ID}`)} >Modificar</CDropdownItem>
                      <CDropdownItem onClick={() => history.push(`/User/Password/${item.ID}`)} >Reestablecer Contraseña</CDropdownItem>
                      <CDropdownItem onClick={() => { eliminar(item.ID)}}>Eliminar</CDropdownItem>                      
                    </CDropdownMenu>
                  </CDropdown>
                  </td>
                )
            }
          
          }
          />         
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
