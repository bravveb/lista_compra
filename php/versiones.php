<?php
include './conexion.php';

$consulta= mysql_query("SELECT version FROM `versiones`;");
echo mysql_error();
$resultado=mysql_fetch_assoc($consulta);
$error =  mysql_error();
if (empty($error)) {
    /* esta informacion se envia solo si la validacion es correcta */
    $resultados["version"] = $resultado['version'];
} else {
    /* esta informacion se envia si la validacion falla */
    $resultados["version"] = $error;
}

/* convierte los resultados a formato json */
$resultadosJson = json_encode($resultados);

/* muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';

/* ---------------------------------------------------------------------------- */
mysql_close($conexion);
?>