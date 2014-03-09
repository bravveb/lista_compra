var ruta_inicial="http://localhost:85/llista_compra/php/"; 
var version = 0.2;
$(document).ready(function(){
    archivoValidacion = ruta_inicial+"versiones.php?jsoncallback=?";
        $.getJSON(archivoValidacion, {})
                .done(function(respuestaServer) {
                    if (respuestaServer.version > version) {
                        navigator.app.loadUrl(url, { openExternal:true });
                        return false;
            }
        }); 
        id_usuario = localStorage.getItem("identificador_sesion");
        carga_imagenes();
});
$(window).load(function(){
    setTimeout(function() {
        if (!localStorage.getItem("identificador_sesion"))
            $.mobile.changePage("#login", {transition: "fade"});
        else {
            $("body").css({"background": "#fff"});
            $.mobile.changePage("#inicio", {transition: "fade"});
        }
    }, 1000);
});
function salir(){
    localStorage.setItem("identificador_sesion", "");
}
function validar_inicio_sesion(){
    var errores="";
    if (document.frm_login.nombre.value.length===0) 
        errores+="Falta el nombre de usuario\n"; 
    if (document.frm_login.password.value.length===0) 
        errores+="Falta la contraseña de usuario\n"; 
    if(errores!=="")
        alert(errores);
    else
        archivoValidacion = ruta_inicial+"login.php?jsoncallback=?";

        $.getJSON(archivoValidacion, {nombre: document.frm_login.nombre.value, password: document.frm_login.password.value})
                .done(function(respuestaServer) {
                    if (respuestaServer.confirmacion === "correcto") {
                        localStorage.setItem("identificador_sesion", respuestaServer.n_id)
                        id_usuario = localStorage.getItem("identificador_sesion");
                        $("body").css({"background":"#fff"});
                        carga_imagenes();
                        $.mobile.changePage("#inicio", {transition: "fade"});
                    }else
                        alert('Usuario o contraseña no validas');
        });
}
function validar_registro(){
    var errores="";
    if (document.frm_registro.nombre.value.length===0) 
        errores+="Falta el nombre de usuario\n"; 
    if (document.frm_registro.password.value.length===0) 
        errores+="Falta la contraseña de usuario\n";
    if (document.frm_registro.password.value!==document.frm_registro.r_password.value) 
        errores+="Las contraseñas no coinciden\n";
    if(errores.length>=1)
        alert(errores);
    else{
        archivoValidacion = ruta_inicial+"registro.php?jsoncallback=?";
        $.getJSON(archivoValidacion, {nombre: document.frm_registro.nombre.value, password: document.frm_registro.password.value})
                .done(function(respuestaServer) {
                    if (respuestaServer.confirmacion === "correcto") {
                        localStorage.setItem("identificador_sesion", respuestaServer.n_id)
                        id_usuario = localStorage.getItem("identificador_sesion");
                        $.mobile.changePage("#inicio", {transition: "fade"});
                        carga_imagenes();
                        $("body").css({"background":"#fff"});
                    }else
                        alert('El usuario ya existe');
        });
    }
}

function carga_imagenes() {
    archivoValidacion = ruta_inicial+"inicio.php?jsoncallback=?";
    $.getJSON(archivoValidacion, {id: id_usuario})
            .done(function(respuestaServer) {
                var res = respuestaServer["i_logo"].substring(0,1);
                if (res==='<')
                    $('.img_usuario').html(respuestaServer["i_logo"]);
                else
                    $('.img_usuario').css({'background':'url("'+ruta_inicial+'images/'+respuestaServer["i_logo"]+'")'});
                $('.cabecera_menu span').html(respuestaServer["nombre"]);
                $('.cabecera_menu').css({'background':'url("'+ruta_inicial+'images/'+respuestaServer["i_fondo"]+'")'});
            });
}

$(document).on( "pageinit", "#buscar_amigos", function() {
    var html="";
    archivoValidacion = "http://localhost:8080/appuestas_api/buscador_amigos.php?jsoncallback=?";
    $.getJSON(archivoValidacion, {nombre: nombre_usuario, id: id_usuario})
            .done(function(respuestaServer) {
                for(x=0;x<respuestaServer["cuenta"];x++){
                    html += "<li>" + respuestaServer["u_"+x] + "<div class='agregar_amigo' onclick='add_amigo("+respuestaServer["i_"+x]+");'>A&ntilde;adir</div></li>";
                }
                $('#buscador_amigos_ul').html(html);
                $('#buscador_amigos_ul').listview("refresh");
                $('#buscador_amigos_ul').trigger("updatelayout");
            });
});

$(document).on( "pageinit", "#amigos", function() {
    var html="";
    archivoValidacion = "http://localhost:8080/appuestas_api/lista_amigos.php?jsoncallback=?";
    $.getJSON(archivoValidacion, {id: id_usuario})
            .done(function(respuestaServer) {
                for(x=0;x<respuestaServer["cuenta"];x++){
                    html += "<li><a href='#'>" + respuestaServer["u_"+x] + "</a><p><strong class='resultado'>Acierto:</strong> 20%</p></li>";
                }
                $('#lista_amigos').html(html);
                $('#lista_amigos').listview("refresh");
                $('#lista_amigos').trigger("updatelayout");
            });
});

function add_amigo(id_amigo){
    archivoValidacion = "http://localhost:8080/appuestas_api/agregar_amigo.php?jsoncallback=?";
    $.getJSON(archivoValidacion, {id: id_usuario, nombre:nombre_usuario, id_amigo:id_amigo })
            .done(function(respuestaServer) {
                $.mobile.changePage("#amigos", {transition: "slideup"});
            });
}

function fondo(){
  $("#cargados").html('Cargando imagen...');
  var archivos = document.getElementById("fondo");//Damos el valor del input tipo file
  var archivo = archivos.files; //Obtenemos el valor del input (los arcchivos) en modo de arreglo
  //El objeto FormData nos permite crear un formulario pasandole clave/valor para poder enviarlo, este tipo de objeto ya tiene la propiedad multipart/form-data para poder subir archivos
  var data = new FormData();
  //Como no sabemos cuantos archivos subira el usuario, iteramos la variable y al
  //objeto de FormData con el metodo "append" le pasamos calve/valor, usamos el indice "i" para
  //que no se repita, si no lo usamos solo tendra el valor de la ultima iteracion
  for(i=0; i<archivo.length; i++){
    data.append('archivo'+i,archivo[i]);
  }
  $("#cargados").html('Subiendo imagen...');
  $.ajax({
    url: ruta_inicial+'subir_fondo.php?usuario='+id_usuario, //Url a donde la enviaremos
    type:'POST', //Metodo que usaremos
    contentType:false, //Debe estar en false para que pase el objeto sin procesar
    data: data, //Le pasamos el objeto que creamos con los archivos
    processData:false, //Debe estar en false para que JQuery no procese los datos a enviar
    cache:false //Para que el formulario no guarde cache
  }).done(function(msg){
    $("#cargados").html(msg); //Mostrara los archivos cargados en el div con el id "Cargados"
  });
  carga_imagenes();
}
function foto(){
  $("#cargados").html('Cargando imagen...');
  var archivos = document.getElementById("foto");//Damos el valor del input tipo file
  var archivo = archivos.files; //Obtenemos el valor del input (los arcchivos) en modo de arreglo
  //El objeto FormData nos permite crear un formulario pasandole clave/valor para poder enviarlo, este tipo de objeto ya tiene la propiedad multipart/form-data para poder subir archivos
  var data = new FormData();
  //Como no sabemos cuantos archivos subira el usuario, iteramos la variable y al
  //objeto de FormData con el metodo "append" le pasamos calve/valor, usamos el indice "i" para
  //que no se repita, si no lo usamos solo tendra el valor de la ultima iteracion
  for(i=0; i<archivo.length; i++){
    data.append('archivo'+i,archivo[i]);
  }
  $("#cargados").html('Subiendo imagen...');
  $.ajax({
    url: ruta_inicial+'subir_foto.php?usuario='+id_usuario, //Url a donde la enviaremos
    type:'POST', //Metodo que usaremos
    contentType:false, //Debe estar en false para que pase el objeto sin procesar
    data: data, //Le pasamos el objeto que creamos con los archivos
    processData:false, //Debe estar en false para que JQuery no procese los datos a enviar
    cache:false //Para que el formulario no guarde cache
  }).done(function(msg){
    $("#cargados").html(msg); //Mostrara los archivos cargados en el div con el id "Cargados"
  });
  carga_imagenes();
}
