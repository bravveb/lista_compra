var ruta_inicial="http://localhost:85/llista_compra/php/";    
function validar_inicio_sesion(){
    var errores="";
    if (document.frm_login.nombre.value.length===0) 
        errores+="Falta el nombre de usuario\n"; 
    if (document.frm_login.password.value.length===0) 
        errores+="Falta la contraseñas de usuario\n"; 
    if(errores!=="")
        alert(errores);
    else
        archivoValidacion = ruta_inicial+"login.php?jsoncallback=?";

        $.getJSON(archivoValidacion, {nombre: document.frm_login.nombre.value, password: document.frm_login.password.value})
                .done(function(respuestaServer) {
                    if (respuestaServer.confirmacion === "correcto") {
                        id_usuario = respuestaServer.n_id;
                        $("body").css({"background":"#fff"});
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
        errores+="Falta la contraseñas de usuario\n";
    if (document.frm_registro.password.value!==document.frm_registro.r_password.value) 
        errores+="Las contraseñas no coinciden\n";
    if(errores.length>=1)
        alert(errores);
    else{
        archivoValidacion = ruta_inicial+"registro.php?jsoncallback=?";

        $.getJSON(archivoValidacion, {nombre: document.frm_registro.nombre.value, password: document.frm_registro.password.value})
                .done(function(respuestaServer) {
                    if (respuestaServer.confirmacion === "correcto") {
                        nombre_usuario = respuestaServer.n_usuario;
                        id_usuario = respuestaServer.n_id;
                        $.mobile.changePage("#inicio", {transition: "fade"});
                        $("body").css({"background":"#fff"});
                    }else
                        alert('El usuario ya existe');
        });
    }
}

$(document).on( "pageinit", "#inicio", function() {
    archivoValidacion = ruta_inicial+"inicio.php?jsoncallback=?";
    $.getJSON(archivoValidacion, {id: id_usuario})
            .done(function(respuestaServer) {
                $('#img_usuario_menu').html(respuestaServer["i_logo"]);
                $('#nombre_menu').html(respuestaServer["nombre"]);
                $('.cabecera_menu').css({'background':'url("'+ruta_inicial+'images/'+respuestaServer["i_fondo"]+'")'});
            });
});

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