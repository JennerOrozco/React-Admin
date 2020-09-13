<?php 
session_start();
include_once('./Connection.php'); 
$link = Conectarse(); 
$data = json_decode(file_get_contents('php://input'), true);

$where = [['Usuario','=', $data['user'] ], ['Estado','=','1']];
$extra = 'Password = SHA("' .$data['password'].'") AND ';


if ($valor = QueryColumnsWhere($link,'tablaUsuarios',['*'],$where,$extra)){      
   $_SESSION['sesion_iniciada'] = true;
   $_SESSION['ROL'] = $valor[0]['Rol_ID'];
   $_SESSION['Id'] = $valor[0]['ID'];
   $_SESSION['Email'] = $valor[0]['Correo'];
   $_SESSION['Nombre'] = $valor[0]['Nombre'];
   $_SESSION['Apellido'] = $valor[0]['Apellido'];      
   echo true;
}else{
   echo false;
}

Desconectarse($link);

   




 ?>