<?php
include './conexion.php';

mysql_query("INSERT INTO `pertenecientes_listas`(`id_usuario`, `id_lista`, `cargo`) VALUES (SHA('{$_GET["id_amigo"]}'), '{$_GET["id_lista"]}', 'invi')");
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