import React from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol  
} from '@coreui/react'
import ChartLineSimple from '../charts/ChartLineSimple'

const WidgetsDropdown = (valores) => {
  const valor = valores.value;    
  // render
  return (
    <CRow>
      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-primary"
          header="IMPRESIONES DE HOY"
          text={''+valor.impression}
          className ='font-xl'          
          footerSlot={
            <ChartLineSimple
            className="mt-3"
            style={{height: '70px'}}
            backgroundColor="rgba(255,255,255,.2)"
            dataPoints={[78, 81, 80, 45, 34, 12, 40]}
            options={{ elements: { line: { borderWidth: 2.5 }}}}            
            label="Members"
            labels="months"
          />
          }
        >                 
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-info"
          header="GANANCIAS DE HOY"
          text={'$ '+ valor.revenue}
          className ='font-xl'
          footerSlot={
            <ChartLineSimple
            className="mt-3"
            style={{height: '70px'}}
            backgroundColor="rgba(255,255,255,.2)"
            dataPoints={[78, 81, 80, 45, 34, 12, 40]}
            options={{ elements: { line: { borderWidth: 2.5 }}}}
            pointHoverBackgroundColor="warning"
            label="Members"
            labels="months"
          />
          }
        >
         
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-warning"
          header={"GANANCIAS DE ESTA SEMANA "}
          text={'$ '+ valor.countryRevenue}
          className ='font-xl'
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{height: '70px'}}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 }}}}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        >
          
        </CWidgetDropdown>
      </CCol>

    </CRow>
  )
}

export default React.memo(WidgetsDropdown)
