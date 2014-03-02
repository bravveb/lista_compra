<?php
include './conexion.php';

$consulta= mysql_query("SELECT id FROM `usuarios` WHERE nombre='{$_GET["nombre"]}' and password=SHA('{$_GET["password"]}');");
echo mysql_error();
$resultado=mysql_fetch_assoc($consulta);
if (empty($resultado)) {
    $error = "El usuario o la contraseña no son validos";
}
else
    $error = mysql_error();

/* verifica que el usuario y password concuerden correctamente */
if (empty($error)) {
    /* esta informacion se envia solo si la validacion es correcta */
    $resultados["n_id"] = $resultado['id'];
    $resultados["confirmacion"] = "correcto";
} else {
    /* esta informacion se envia si la validacion falla */
    $resultados["confirmacion"] = "error";
}

/* convierte los resultados a formato json */
$resultadosJson = json_encode($resultados);

/* muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';

/* ---------------------------------------------------------------------------- */
mysql_close($conexion);
?>