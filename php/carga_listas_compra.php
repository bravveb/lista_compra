<?php
include './conexion.php';

$peticion=mysql_query("SELECT * FROM listas, pertenecientes_listas WHERE listas.id=pertenecientes_listas.id_lista and pertenecientes_listas.id_usuario='{$_GET["id"]}' ORDER BY listas.nombre");
//SELECT * FROM listas, pertenecientes_listas WHERE listas.id=pertenecientes_listas.id_lista and pertenecientes_listas.id_usuario='{$_GET["id"]}'
echo mysql_error();
$x=0;
 while ($registro = mysql_fetch_array($peticion)){
    $sh_usuarios["id_".$x]=$registro["id"];
    $sh_usuarios["nl_".$x]=$registro["nombre"];
    $sh_usuarios["dl_".$x]=$registro["descripcion"];
    $sh_usuarios["np_".$x]=$registro["n_productos"];
    $sh_usuarios["npc_".$x]=$registro["n_productos_comprados"];
    $sh_usuarios["ca_".$x]=$registro["cargo"];
    if($registro["n_productos_comprados"]==0 || $registro["n_productos"]==0){
        $porcentaje=0;
    }else{
        $porcentaje=($registro["n_productos_comprados"]*100)/$registro["n_productos"];
    }
    $sh_usuarios["pp_".$x]=$porcentaje;
    $x++;
 }
$sh_usuarios["cuenta"]=$x;
/* convierte los resultados a formato json */
$resultadosJson = json_encode($sh_usuarios);
/* muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';
mysql_close($conexion);