<?php 
 
 $host = "localhost";

 $puerto = "3308";

 $usuario = "root";

 $contrasena = "";

 $DB = "admindash";

 

 function Conectarse()
 {
    global $host, $puerto, $usuario, $contrasena,$DB;

    if (!($link = mysqli_connect($host.":".$puerto, $usuario, $contrasena,$DB))) 
    { 
      echo "Ah ocurrido un error al momento de realizar la conexion/n";
      exit(); 
    }
    else
    {
       
    }    
    
 return $link; 
 } 

 function Desconectarse($link)
 {
   mysqli_close($link);
 } 

 
function QueryColumns($link,$Table,$Column){
  $numItems = count($Column);
  $i = 0;

  $StringColumn = '';
  foreach ($Column as $value) {
    if(++$i === $numItems) {
      $StringColumn = $StringColumn . $value;
    }else{
      $StringColumn = $StringColumn . $value . ',';
    }     
  }

  $index = 0;
  $data = array();


   
  if ($result = mysqli_query($link, "SELECT " . $StringColumn ." FROM " . $Table)) {
    $Fields = mysqli_num_fields($result);        

    
    
    if ($result) {      

      while($row = mysqli_fetch_array($result, MYSQLI_NUM)){        
        for ($indiceField=0; $indiceField < $Fields; $indiceField++) { 
          $finfo = mysqli_fetch_field_direct($result, $indiceField);
          $data[$index][$finfo->name] = $row[$indiceField];         
        }
        $index++;          
      }
  }
    mysqli_free_result($result);    
    return $data;
  }else{
    return[];
  }
}




function QueryColumnsWhere($link,$Table,$Column,$Where,$extra){
  $numItems = count($Column);
  $i = 0;

  $StringColumn = '';
  foreach ($Column as $value) {
    if(++$i === $numItems) {
      $StringColumn = $StringColumn . $value;
    }else{
      $StringColumn = $StringColumn . $value . ',';
    }     
  }


  $WhereStatement = $extra;

  
  $numItems = count($Where);
  $i = 0;  

  
  foreach ($Where as $value) {
    if(++$i === $numItems) {
      $WhereStatement = $WhereStatement . $value[0] . $value[1] . "'" . $value[2] . "'";
    }else{
      $WhereStatement = $WhereStatement . $value[0] . $value[1] . "'" . $value[2] . "'" . " AND ";
    }     
  }

  $index = 0;
  $data = array();
  $queryStatement = "SELECT " . $StringColumn ." FROM " . $Table . " WHERE " . $WhereStatement;      
  
  if ($result = mysqli_query($link, $queryStatement)) {
    $Fields = mysqli_num_fields($result);        
    if ($result) {      
      while($row = mysqli_fetch_array($result, MYSQLI_NUM)){       
        for ($indiceField=0; $indiceField < $Fields; $indiceField++) { 
          $finfo = mysqli_fetch_field_direct($result, $indiceField);
          $data[$index][$finfo->name] = $row[$indiceField];          
        }
        $index++;          
      }
  }
    mysqli_free_result($result);    
    return $data;
  }else{
    return[];
  }
}


 





 ?>