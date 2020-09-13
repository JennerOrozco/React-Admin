<?php 
session_start();
include_once('./Connection.php'); 
$link = Conectarse(); 
$data = json_decode(file_get_contents('php://input'), true);

$error = false;
$String = "DELETE FROM tablaapi WHERE Usuario_ID = " . $data['ID'];
echo $String;
if (mysqli_query($link, $String)) {
  $error = false;
} else {
  $error = false;
}

$String = "DELETE FROM tablausuarios WHERE  ID = " . $data['ID'];
echo $String;
if (mysqli_query($link, $String)) {
  $error = false;
} else {
  $error = true;
}
echo $error;

Desconectarse($link);





 ?>