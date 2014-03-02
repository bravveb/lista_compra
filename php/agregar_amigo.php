<?php
$conexion = mysql_connect ("localhost","appuestas","appuestas");
mysql_select_db("appuestas",$conexion);

$consulta=mysql_query("SELECT nombre FROM usuarios WHERE id='{$_GET["id_amigo"]}'");
$resultado=mysql_fetch_assoc($consulta);

mysql_query("INSERT INTO `amigos`(`id_usuario`, `nombre_usuario`, `id_amigo`, `nombre_amigo`) VALUES ('{$_GET["id"]}','{$_GET["nombre"]}','{$_GET["id_amigo"]}','{$resultado['nombre']}')");
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