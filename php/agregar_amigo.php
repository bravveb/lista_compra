<?php
include './conexion.php';

mysql_query("INSERT INTO `amigos`(`id_usuario`, `id_amigo`) VALUES ('{$_GET["id"]}', SHA('{$_GET["id_amigo"]}'))");
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