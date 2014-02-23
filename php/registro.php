<?php
$conexion = mysql_connect ("localhost","lista_compra","lista_compra");
mysql_select_db("lista_compra",$conexion);

$inicial=$_GET["nombre"]{0};
$num_color=rand(1, 11);
$color="f_color".$num_color;

mysql_query("INSERT INTO `usuarios`(`id`,`nombre`, `password`, `imagen_logo`) VALUES (SHA('{$_GET["nombre"]}'),'{$_GET["nombre"]}', SHA('{$_GET["password"]}'), '<div class=\"letra $color\">$inicial</div>')");
$x = mysql_errno();
if ($x == 1062) {
    $error = "El usuario ya esta en uso";
}

/* verifica que el usuario y password concuerden correctamente */
if (empty($error)) {
    /* esta informacion se envia solo si la validacion es correcta */
    $resultados["confirmacion"] = "correcto";
} else {
    /* esta informacion se envia si la validacion falla */
    $resultados["confirmacion"] = "erroneo";
}
/* convierte los resultados a formato json */
$resultadosJson = json_encode($resultados);

/* muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';
mysql_close($conexion);