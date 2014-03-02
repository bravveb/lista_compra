<?php
  //Como no sabemos cuantos archivos van a llegar, iteramos la variable $_FILES
  $ruta="images/";
  
  foreach ($_FILES as $key) {
    if($key['error'] == UPLOAD_ERR_OK ){//Verificamos si se subio correctamente
      list($origen_n, $extension) = split('/', $key['type']);
      $nombre = $_GET['usuario'].'_fondo.'.$extension;//Obtenemos el nombre del archivo
      $temporal = $key['tmp_name']; //Obtenemos el nombre del archivo temporal
      $tamano= ($key['size'] / 1000)."Kb"; //Obtenemos el tamaño en KB
      move_uploaded_file($temporal, $ruta . $nombre); //Movemos el archivo temporal a la ruta especificada
      //El echo es para que lo reciba jquery y lo ponga en el div "cargados"
      include './conexion.php';
        $consulta= mysql_query("UPDATE `usuarios` SET `imagen_fondo`='$nombre' WHERE id='{$_GET['usuario']}'");
        mysql_close($conexion);
      echo "
        <div id='subido'>
        <span><strong>Imagen subida correctamente</span><br />
        </div>
      ";
    }else{
      echo "
        <div id='subido'>
        <span><strong>Error al subir la imagen, pruebe de nuevo</span><br />
        </div>
      ";
    }
  }
?>