import React,{ Component } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils/src'
const axios = require('axios');


const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'

class MainChartExample extends Component {

  state = {
    data : [],
    objetoSend: {},
    dates: []
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

    let respuesta = await  axios.get(`http://Api3.adsterratools.com/publisher/ccbba23135a1a9fdb28b8e7969577544/stats.json?domain=${DatosApi.Domain}&placement=${DatosApi.Placement}&start_date=${dateIni}&finish_date=${dateFin}&group_by%5B%5D=date`)    
    
    let arreglo2 = respuesta.data.items.map(x => x.revenue)
    let arreglo3 = respuesta.data.items.map(x => x.date)
    let arreglo4 = respuesta.data.items.map(x => x.impression)

    let arreglo = [
        {
          label: 'Ganancias',
          backgroundColor: hexToRgba(brandInfo, 10),
          borderColor: brandInfo,
          pointHoverBackgroundColor: brandInfo,
          borderWidth: 2,
          data: arreglo2
        },
        {
          label: 'Impresionse',          
          borderColor: brandDanger,
          backgroundColor: hexToRgba(brandDanger, 10),
          pointHoverBackgroundColor: brandDanger,
          borderWidth: 1,          
          data: arreglo4
        }
      ]

    this.setState({
      data : arreglo
    })

    this.setState({
      dates : arreglo3
    })

    let objeto = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            drawOnChartArea: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(250 / 5),
            max: 250
          },
          gridLines: {
            display: true
          }
        }]
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    }

    this.setState({
      objetoSend : objeto
    })


  }




    


  // render
  render() {return (
    <CChartLine      
      datasets={this.state.data}
      options={this.defaultOptions}
      labels={this.state.dates}
    />
    )
  }
}


export default MainChartExample
