<?php
include './conexion.php';

mysql_query("DELETE FROM `amigos` WHERE `id_usuario`='{$_GET["id"]}' AND `id_amigo`=SHA('{$_GET["id_amigo"]}')");
if(mysql_error()=="")
    {$sh_usuarios["confirmacion"]="ok";}
else
    {$sh_usuarios["confirmacion"]=mysql_error();}
/* convierte los resultados a formato json */
$resultadosJson = json_encode($sh_usuarios);
/* muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';
mysql_close($conexion);
/**/


