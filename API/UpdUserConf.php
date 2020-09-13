<?php 
session_start();
include_once('./Connection.php'); 
$link = Conectarse(); 
$data = json_decode(file_get_contents('php://input'), true);

$String = "";
$extra = "";

if (!($data['New'])){
  $String = "INSERT INTO tablaapi (Usuario_ID,Domain,Placement,Porcentaje)  VALUES  (";
  $extra = "'". $data['ID'] . "'" . ",  ";
  $extra = $extra ."'". $data['Domain'] . "'" . ",  ";
  $extra = $extra . "'". $data['Placement'] . "'" . ",";
  $extra = $extra . "'". $data['Porcentaje'] . "'" . ")";
  
}else{
  $String = "UPDATE tablaapi SET  Domain = ";
  $extra = "'". $data['Domain'] . "'" . ", Placement = ";
  $extra = $extra . "'". $data['Placement'] . "', Porcentaje = ";
  $extra = $extra . "". $data['Porcentaje'] . " WHERE Usuario_ID = " . $data['ID'];

}


$String =$String . " " . $extra;


if (mysqli_query($link, $String)) {
  echo "New record created successfully";
} else {
  echo "Error: " . $String . "<br>" . mysqli_error($link);
}

Desconectarse($link);





 ?>