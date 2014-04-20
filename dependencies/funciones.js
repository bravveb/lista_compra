var ruta_inicial="http://bravveb.hol.es/lstcp/php/"; 
var version = 0.7;
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
function func_nueva_lista(){
    var errores="";
    if (document.nueva_lista.nombre_nlista.value.length===0) 
        errores+="Falta el nombre de la lista";
    if(errores.length>=1)
        alert(errores);
    else{
        archivoValidacion = ruta_inicial+"add_lista.php?jsoncallback=?";
        $.getJSON(archivoValidacion, {nombre: document.nueva_lista.nombre_nlista.value, descripcion: document.nueva_lista.descripcion_nlista.value, id: id_usuario})
                .done(function(respuestaServer) {
                    if (respuestaServer.confirmacion === "correcto") {
                        $.mobile.changePage("#listas");
                        func_carga_listas();
                    }else
                        alert('Error al crear la lista');
        });
    }
}
function func_carga_listas(){
    var html="";
    archivoValidacion = ruta_inicial+"carga_listas_compra.php?jsoncallback=?";
    $.getJSON(archivoValidacion, {id: id_usuario})
            .done(function(respuestaServer) {
                for(x=0;x<respuestaServer["cuenta"];x++){
                    html +='<li class="lista_cm" onclick="func_carga_una_lista('+respuestaServer["id_"+x]+', '+respuestaServer["npc_"+x]+', '+respuestaServer["np_"+x]+', '+respuestaServer["pp_"+x]+', \''+respuestaServer["ca_"+x]+'\', \''+respuestaServer["nl_"+x]+'\', \''+respuestaServer["dl_"+x]+'\');">\n\
                            <a href="#">\n\
                            <h2>'+respuestaServer["nl_"+x]+'</h2><p>\n\
                            <strong>'+respuestaServer["dl_"+x]+'</strong></p>\n\
                            <p>Almacen: No</p>\n\
                            <p class="ui-li-aside" id="porct_'+respuestaServer["id_"+x]+'">'+respuestaServer["npc_"+x]+'/'+respuestaServer["np_"+x]+'</p>\n\
                            </a></li><li class="porcentaje" style="width:'+respuestaServer["pp_"+x]+'%"></li><li class="marca_porcentaje"></li>';
                }
                $('#listas_listas').html(html);
                $('#listas_listas').listview("refresh");
            });
}
function func_carga_una_lista(id_lista, n_productosc, nproductos, porcentaje,cargo, nombre_lista, descripcion_lista){
    $('#nombre_lista_cabecera').html(nombre_lista);
    $('.descripcion_lista_individual .descripcion').html(descripcion_lista);
    $('.descripcion_lista_individual .n_productos').html(n_productosc+'/'+nproductos);
    $('.descripcion_lista_individual .porcentaje').css({'width':''+porcentaje+'%'});
    $('#np_id_lista').val(id_lista);
    func_listar_productos(id_lista);
    $.mobile.changePage("#lista_individual");
}
function func_agregar_producto(){
    var errores="";
    if (document.nuevo_producto.nuevo_fproducto.value.length===0) 
        errores+="Falta el nombre del producto";
    if(errores.length>=1)
        alert(errores);
    else{
        archivoValidacion = ruta_inicial+"add_producto.php?jsoncallback=?";
        $.getJSON(archivoValidacion, {nombre: document.nuevo_producto.nuevo_fproducto.value, id_lista: document.nuevo_producto.np_id_lista.value})
                .done(function(respuestaServer) {
                    if (respuestaServer.confirmacion === "correcto") {
                        $.mobile.changePage("#lista_individual");
                        func_listar_productos(document.nuevo_producto.np_id_lista.value);
                    }else
                        alert('Error al crear la lista');
        });
    }
}
function func_listar_productos(ide_lista){
    var html="";
    estado_temp="enable";
    archivoValidacion = ruta_inicial+"carga_lista_producto.php?jsoncallback=?";
    $.getJSON(archivoValidacion, {id_lista: ide_lista})
        .done(function(respuestaServer) {
    for(x=0;x<respuestaServer["cuenta"];x++){
    html +='<div class="ck_contenedor" data-estado="'+respuestaServer["est_"+x]+'" onclick="fun_ck_custom_lis('+respuestaServer["idp_"+x]+','+ide_lista+', \''+estado_temp+'\');" id="producto'+respuestaServer["idp_"+x]+'">\n\
            <div class="zona_estado '+respuestaServer["cla_"+x]+'"></div>\n\
            <div class="contenido_productos">'+respuestaServer["nmp_"+x]+'</div></div>';
        }
        $('#productos_list').html(html);
    });
}
function fun_ck_custom_lis(valor_clave, lista, valor_edit){
    valor_estado=$("#producto"+valor_clave).attr("data-estado");
    if(valor_edit!=="disabled"){
        if(valor_estado==="0"){
            $("#producto"+valor_clave+" .zona_estado").addClass("reservado");
            $("#producto"+valor_clave).attr("data-estado", "1");
            archivoValidacion = ruta_inicial+"upd_producto.php?jsoncallback=?";
            $.getJSON(archivoValidacion, {id_producto: valor_clave, estado: 1})
        .done(function(respuestaServer) {
            //$('.n_productos').html(respuestaServer['npc_loc']+"/"+respuestaServer['np_loc']);
            //$('.descripcion_lista_individual .porcentaje').animate({'width': respuestaServer['pp_loc']+'%'});
            //$('#porct_'+lista).html(respuestaServer['npc_loc']+"/"+respuestaServer['np_loc']);
        });
        }else if(valor_estado==="1"){
            $("#producto"+valor_clave+" .zona_estado").removeClass("reservado");
            $("#producto"+valor_clave+" .zona_estado").addClass("comprado");
            archivoValidacion = ruta_inicial+"upd_producto.php?jsoncallback=?";
            $("#producto"+valor_clave).attr("data-estado", "2");
            $.getJSON(archivoValidacion, {id_producto: valor_clave, estado: 2, lista:lista})
        .done(function(respuestaServer) {
            $('.n_productos').html(respuestaServer['npc_loc']+"/"+respuestaServer['np_loc']);
            $('.descripcion_lista_individual .porcentaje').animate({'width': respuestaServer['pp_loc']+'%'});
            $('#porct_'+lista).html(respuestaServer['npc_loc']+"/"+respuestaServer['np_loc']);
        });
        }else{
            $("#producto"+valor_clave+" .zona_estado").removeClass("comprado");
            $("#producto"+valor_clave).attr("data-estado", "0");
            archivoValidacion = ruta_inicial+"upd_producto.php?jsoncallback=?";
            $.getJSON(archivoValidacion, {id_producto: valor_clave, estado: 0, lista: lista})
        .done(function(respuestaServer) {
            $('.n_productos').html(respuestaServer['npc_loc']+"/"+respuestaServer['np_loc']);
            $('.descripcion_lista_individual .porcentaje').animate({'width': respuestaServer['pp_loc']+'%'});
            $('#porct_'+lista).html(respuestaServer['npc_loc']+"/"+respuestaServer['np_loc']);
        });
        }
    }
}
function fun_personas(){
    html="";
    archivoValidacion = ruta_inicial+"listar_personas.php?jsoncallback=?";
    $.getJSON(archivoValidacion, {id_usuario: id_usuario})
            .done(function(respuestaServer) {
                for (x = 0; x < respuestaServer["cuenta"]; x++) {
                    html += '<li onclick="func_paso_perf_us(\''+respuestaServer["n_"+x]+'\');")><a href="#">'+respuestaServer["n_"+x]+'</a></li>';
                }
                $('#l_sch_amigo').html(html);
                $('#l_sch_amigo').listview("refresh");
                $('#l_sch_amigo').trigger("updatelayout");
            });
}
function func_paso_perf_us(usuario){
    $('#nombre_usuario_perf').html(usuario);
    $('#contened_imgs_perfil').html('<div class="fondo_perf"><div class="img_usuario"></div></div><div class="nombre">'+usuario+'</div>');
    agregadoono(usuario);
    
    archivoValidacion = ruta_inicial+"perfil_individual.php?jsoncallback=?";
    $.getJSON(archivoValidacion, {id: usuario})
            .done(function(respuestaServer) {
                var res = respuestaServer["i_logo"].substring(0,1);
                if (res==='<')
                    $('.fondo_perf .img_usuario').html(respuestaServer["i_logo"]);
                else
                    $('.fondo_perf .img_usuario').css({'background':'url("'+ruta_inicial+'images/'+respuestaServer["i_logo"]+'")'});
                if(respuestaServer["i_fondo"]!==null)
                    $('.fondo_perf').css({'background':'url("'+ruta_inicial+'images/'+respuestaServer["i_fondo"]+'")'});
            });
    $.mobile.changePage("#perfil_us_in");
}
function func_listar_amigo(id_usuario){
    html="";
    archivoValidacion = ruta_inicial+"listar_amigos.php?jsoncallback=?";
    $.getJSON(archivoValidacion, {id_usuario: id_usuario})
            .done(function(respuestaServer) {
                for (x = 0; x < respuestaServer["cuenta"]; x++) {
                    html += '<li onclick="func_paso_perf_us(\''+respuestaServer["n_"+x]+'\');")><a href="#">'+respuestaServer["n_"+x]+'</a></li>';
                }
                $('#lista_amigos_li').html(html);
                $('#lista_amigos_li').listview("refresh");
                $('#lista_amigos_li').trigger("updatelayout");
            });
}
function func_add_ami(n_amigo){
    archivoValidacion = ruta_inicial+"agregar_amigo.php?jsoncallback=?";
    $.getJSON(archivoValidacion, {id: id_usuario, id_amigo: n_amigo})
            .done(function(respuestaServer) {
                agregadoono(n_amigo);
            });
}
function func_del_ami(n_amigo){
    archivoValidacion = ruta_inicial+"delete_amigo.php?jsoncallback=?";
    $.getJSON(archivoValidacion, {id: id_usuario, id_amigo: n_amigo})
            .done(function(respuestaServer) {
                agregadoono(n_amigo);
            });
}
function agregadoono(n_amigo){
    archivoValidacion = ruta_inicial+"estado_amigo.php?jsoncallback=?";
    $.getJSON(archivoValidacion, {id: id_usuario, id_amigo: n_amigo})
            .done(function(respuestaServer) {
                if(respuestaServer['confirmacion']==="no"){
                    $('#boton_agregar_amigo').html('<input type="button" class="agregar" value="Agregar Amigo" onclick="func_add_ami(\''+n_amigo+'\');")>');
                }else{
                    $('#boton_agregar_amigo').html('<input type="button" class="delete" value="Eliminar Amigo" onclick="func_del_ami(\''+n_amigo+'\');")>');
                }
            });
            func_listar_amigo(id_usuario)
}
function func_admin_list(){
    lista=$("#np_id_lista").val();
     html="";
    archivoValidacion = ruta_inicial+"listar_amigos.php?jsoncallback=?";
    $.getJSON(archivoValidacion, {id_usuario: id_usuario})
            .done(function(respuestaServer) {
                for (x = 0; x < respuestaServer["cuenta"]; x++) {
                    html += '<li onclick="func_listar_privilegios('+lista+',\''+respuestaServer["n_"+x]+'\');")><a href="#">'+respuestaServer["n_"+x]+'</a></li>';
                }
                $('#agreamigos_li').html(html);
                $('#agreamigos_li').listview("refresh");
                $('#agreamigos_li').trigger("updatelayout");
            });
}
function func_listar_privilegios(lista, nombre_amigo){
   $('#boton_add_a_lista').html('<input type="button" class="agregar" value="Agregar a Lista" onclick="func_add_list('+lista+', \''+nombre_amigo+'\');")>'); 
   $.mobile.changePage("#add_a_lista");
}
function func_add_list(lista, nombre_amigo){
    archivoValidacion = ruta_inicial+"add_amigo_lista.php?jsoncallback=?";
    $.getJSON(archivoValidacion, {id_lista: lista, id_amigo: nombre_amigo})
            .done(function(respuestaServer) {
            });
}