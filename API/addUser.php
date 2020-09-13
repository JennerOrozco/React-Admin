<?php 
session_start();
include_once('./Connection.php'); 
$link = Conectarse(); 
$data = json_decode(file_get_contents('php://input'), true);
$String = "INSERT INTO tablausuarios (Usuario, Nombre,Apellido, Estado,Correo,Password,Rol_ID) VALUES (";
$extra = "'". $data['Usuario'] . "'" . ",";
$extra = $extra . "'". $data['Nombre'] . "'" . ",";
$extra = $extra . "'". $data['Apellido'] . "'" . ",";
$extra = $extra . "'". 1 . "'" . ",";
$extra = $extra . "'". $data['CorreoElectronico'] . "'" . ",";
$extra = $extra . "SHA('". $data['Contraseña'] . "'" . "),";
$extra = $extra . "'". $data['Rol_ID'] . "')";


$String =$String . " " . $extra;


if (mysqli_query($link, $String)) {
  $last_id = mysqli_insert_id($link);
  echo $last_id;
} else {
  echo false;
}


Desconectarse($link);





 ?>