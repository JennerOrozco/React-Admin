<?php 
session_start();
header("Access-Control-Allow-Origin: *");
include_once('./Connection.php'); 


$nav = array();
if (isset( $_SESSION['ROL'])) {
$isADmin = $_SESSION['ROL'];
} else {
   $isADmin = 1;
}



$arreglo = array(
   '_tag'  => 'CSidebarNavItem',
   'name'  => 'Dashboard',
   'to'  => '/dashboard',
   'icon' => 'cil-speedometer'   
);

$item = array(
   '_tag'  => 'CSidebarNavTitle',
   '_children'  => ['USUARIOS']
);

$arreglo2 = array(
   '_tag'  => 'CSidebarNavItem',
   'name'  => 'Agregar Usuario',
   'to'  => '/User/Add',
   'icon' => 'cil-user-follow'
);

$arreglo3 = array(
   '_tag'  => 'CSidebarNavItem',
   'name'  => 'Configuracion Usuario',
   'to'  => '/usuarios',
   'icon' => 'cil-list-rich'
);



array_push($nav,$arreglo);
if ($isADmin == 1){
array_push($nav,$item);
array_push($nav,$arreglo2);
array_push($nav,$arreglo3);
}

$item = array(
   '_tag'  => 'CSidebarNavTitle',
   '_children'  => array('CUENTA')  
);

$arreglo2 = array(
   '_tag'  => 'CSidebarNavItem',
   'name'  => 'Log Out',
   'to'  => '/Login',
   'icon' => 'cil-x'
);

$arreglo3 = array(
   '_tag'  => 'CSidebarNavItem',
   'name'  => 'Cambiar contraseña',
   'to'  => '/User/Password',
   'icon' => 'cil-lock-locked'
);

array_push($nav,$item);
array_push($nav,$arreglo3);
array_push($nav,$arreglo2);


   
echo json_encode($nav);


 ?>