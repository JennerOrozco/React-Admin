import React, { Component,lazy } from 'react'

import {    
  CCardHeader,  
  CDataTable,
  CButtonGroup,
  CCard,
  CCardBody,  
  CCol,  
  CRow
  
} from '@coreui/react'

import MainChartExample from '../charts/MainChartExample.js'
var moment = require('moment'); 



const axios = require('axios');

const fields = ['intervalo','ganancia']


const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

class  Dashboard extends Component {
  state = {
    hoy: [],
    datos : []
  }  

  componentDidMount(){
    this.fecthNav()
  }  


  fecthNav = async () => {

    let respuestaDatos = await  axios.get(`http://localhost/Api/getUserParameters.php`)
    
    let DatosApi = respuestaDatos.data[0]
    

    let today = new Date();    

    let dateIni = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ 1
    let dateFin = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

    let todayWeek = moment(today).format('W')
    let todayMonth = moment(today).format('M')
     
    let bestCounty = await  axios.get(`http://Api3.adsterratools.com/publisher/ccbba23135a1a9fdb28b8e7969577544/stats.json?domain=${DatosApi.Domain}&placement=${DatosApi.Placement}&start_date=${dateIni}&finish_date=${dateFin}&group_by%5B%5D=country`)    
    const max = bestCounty.data.items.reduce(function(prev, current) {
      return (prev.revenue > current.revenue) ? prev : current
  }) 
    
    dateIni = today.getFullYear()+'-'+(today.getMonth()-1)+'-'+today.getDate()
    
    
    
    let respuesta = await  axios.get(`http://Api3.adsterratools.com/publisher/ccbba23135a1a9fdb28b8e7969577544/stats.json?domain=${DatosApi.Domain}&placement=${DatosApi.Placement}&start_date=${dateIni}&finish_date=${dateFin}&group_by%5B%5D=date`)    
    console.log(respuesta)
    let days = respuesta.data.items.map(x => {return [moment(x.date).format('D'), x.revenue - ((x.revenue * DatosApi.Porcentaje) / 100) ]})
    let weeks = respuesta.data.items.map(x => {return [moment(x.date).format('W'), x.revenue - ((x.revenue * DatosApi.Porcentaje) / 100) ]})
    let months = respuesta.data.items.map(x => {return [moment(x.date).format('M'),x.revenue - ((x.revenue * DatosApi.Porcentaje)/ 100) ]})
    let indiceHoy = respuesta.data.items.length;    
    let SemanaArray = {}
    weeks.forEach( x => {

      if( !SemanaArray.hasOwnProperty(x[0])){
        SemanaArray[x[0]] = {
          Semana: []
        }
      }      
      SemanaArray[x[0]].Semana.push({
          semana: x[0],
          valor: x[1]
        })
      
    })


    let MesArray = {}
    
    months.forEach( x => {

      if( !MesArray.hasOwnProperty(x[0])){
        MesArray[x[0]] = {
          Mes: []
        }
      }
            
      MesArray[x[0]].Mes.push({
          Mes: x[0],
          valor: x[1]
        })
      
    })
    
    const reducer = (accumulator, currentValue) => accumulator = accumulator + currentValue.valor;


    let hoy = days[days.length - 1][1]
    let ayer = days[days.length - 2][1]
    let semana = SemanaArray[todayWeek].Semana.reduce(reducer,0)
    let semanaPas = SemanaArray[todayWeek-1].Semana.reduce(reducer,0)
    let mes = MesArray[todayMonth].Mes.reduce(reducer,0)
    let mesPas = MesArray[todayMonth-1].Mes.reduce(reducer,0)
    
    let GananciaDeHoy = respuesta.data.items[indiceHoy-1];
    GananciaDeHoy.revenue = (GananciaDeHoy.revenue - ((GananciaDeHoy.revenue.toFixed(2) * DatosApi.Porcentaje) / 100 )).toFixed(2)
    
    this.setState({
        hoy : {...GananciaDeHoy,country: max.country,countryRevenue: semana.toFixed(2)},
        datos:[
        {id: 0, intervalo: 'Ganancias de hoy', ganancia: '$' +hoy.toFixed(2)},
        {id: 1, intervalo: 'Ganancias de ayer', ganancia: '$' +ayer.toFixed(2)},
        {id: 2, intervalo: 'Ganancias de esta semana', ganancia: '$' +semana.toFixed(2)},
        {id: 3, intervalo: 'Ganancias de la semana pasada', ganancia: '$' +semanaPas.toFixed(2)},
        {id: 4, intervalo: 'Ganancias de este mes', ganancia: '$' +mes.toFixed(2)},
        {id: 5, intervalo: 'Ganancias del mes pasado', ganancia: '$' +mesPas.toFixed(2)}
        
      ]
  })   

    
  }

  
 render() {
   return (
    <>
      <WidgetsDropdown value={this.state.hoy} />      
      <CRow>
      <CCol xs="8">
      <CCard>
        <CCardBody>
          <CRow >
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Grafica de ganancias</h4>              
            </CCol>
            <CCol sm="7" className="d-none d-md-block">                            
              <CButtonGroup className="float-right mr-3">               
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChartExample style={{height: '300px', marginTop: '40px'}}/>
        </CCardBody>        
      </CCard>
      </CCol>

      <CCol xs="4" className="float-right">
      <CCard>
            <CCardHeader>
              Ganancias
            </CCardHeader>
            
            <CDataTable
              size="sm"
              hover
              striped
              dark
              items={this.state.datos}
              fields={fields}
              itemsPerPage={5}                            
            />            
          </CCard>
        </CCol>
      </CRow>
    

    </>
  )
}
}

export default Dashboard
