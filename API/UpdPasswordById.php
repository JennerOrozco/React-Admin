<?php 
session_start();
include_once('./Connection.php'); 
$link = Conectarse(); 
$data = json_decode(file_get_contents('php://input'), true);


  $String = 'UPDATE tablausuarios SET Password = SHA("'. $data['pas'].  '") ';
  $extra = "WHERE ID = ". $data['id'];  
  
  $String =$String . " " . $extra;  
  
  if (mysqli_query($link, $String)) {
    echo "OK";
  } else {
    echo 'FAIL';
  }





Desconectarse($link);





 ?>