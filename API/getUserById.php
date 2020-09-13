<?php 
session_start();
include_once('./Connection.php'); 
$link = Conectarse(); 
$data = json_decode(file_get_contents('php://input'), true);

$where = [['ID','=', $data['ID'] ]];
$extra = '';

if ($valor = QueryColumnsWhere($link,'tablaUsuarios',['*'],$where,$extra)){
   echo json_encode($valor);
}else{
   echo 'error';
}
?>