<?php 
session_start();
include_once('./Connection.php'); 
$data = json_decode(file_get_contents('php://input'), true);
$error = false;


if (!(isset($_SESSION['Id']))){
  $ID=3;
}else{
  $ID = $_SESSION['Id'];
}
$link = Conectarse(); 


$where = [['ID','=', $ID ]];
$extra = 'Password = SHA("' . $data['pas'] . '") AND ';

if ($valor = QueryColumnsWhere($link,'tablaUsuarios',['*'],$where,$extra)){     
  $error = false;
}else{
  $error = true;
}

if ($data['pasNew'] == $data['pasConf'] ){
  if (!$error){
  $String = 'UPDATE tablausuarios SET Password = SHA("'.$data['pasNew'].  '") ';
  $extra = "WHERE ID = ". $ID;  
  
  $String =$String . " " . $extra;  
  
  if (mysqli_query($link, $String)) {
    echo "OK";
  } else {
    echo 'FAIL';
  }

  }else{
    echo 'FAIL';
  }

}


Desconectarse($link);





 ?>