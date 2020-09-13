<?php 
session_start();
header("Access-Control-Allow-Origin: *");
include_once('./Connection.php'); 

$link = Conectarse(); 
$where = [];
$extra = '';


if ($valor = QueryColumns($link,'tablaRol',['*'],$where,$extra)){   
  
   echo json_encode($valor);
}else{
   echo false;
}

   



 ?>