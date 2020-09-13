<?php 
session_start();
include_once('./Connection.php'); 
$link = Conectarse(); 
$data = json_decode(file_get_contents('php://input'), true);
$String = "UPDATE tablausuarios SET  Nombre = ";
$extra = "'". $data['Nombre'] . "'" . ", Apellido = ";
$extra = $extra . "'". $data['Apellido'] . "'" . ", Correo = ";
$extra = $extra . "'". $data['CorreoElectronico'] . "'" . ",Rol_ID = ";
$extra = $extra . "". $data['Rol_ID'] . " WHERE ID = " . $data['ID'];


$String =$String . " " . $extra;


if (mysqli_query($link, $String)) {
  echo "New record created successfully";
} else {
  echo "Error: " . $String . "<br>" . mysqli_error($link);
}


Desconectarse($link);





 ?>