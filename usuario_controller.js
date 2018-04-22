function login() {
    var usuario = {
        usuario: $('#username').val(),
        password: $('#pass').val(),
        metodo: "select"
    }
    $.ajax({
        url: "../php/usuario.php",
        method: "POST",
        data: usuario,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (usuario_response) {

            if (usuario_response == "Error") {
                $('#mensaje').text("El usuario digitado no existe");
            } else {
                var usuarioGuardado = JSON.parse(usuario_response);
                if (usuarioGuardado.password == usuario.password) {
                    sessionStorage.setItem("usuarioLogueado", usuario_response);
                    if (usuarioGuardado.rol == '0') {
                        window.location.href = "admin.html";
                    } else {
                        window.location.href = "index.html";
                    }
                } else {
                    $('#mensaje').text("El password es incorrecto");
                }
            }
        }
    });
    return false;
}

function logout() {
    sessionStorage.removeItem('usuarioLogueado');
    window.location.href = 'index.html';
}
 
function registro() {
    var usuario = {
        usuario: $('#usuario').val(),
        password: $('#pass').val(),
        nombre: $('#nombre').val(),
        correo: $('#correo').val(),
        pregunta: $('#pregunta').val(),
        respuesta: $('#respuesta').val(),
        direccion: $('#direccion').val(),
        telefono: $('#telefono').val(),
        metodo: 'registro'
    }
    $.ajax({
        url: "../php/usuario.php",
        method: "POST",
        data: usuario,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (usuario_response) {
            if (usuario_response == 'Exito') {
                alert('Se ha registrado con éxito!');
                window.location.href = 'login.html';
            } else {
                alert('Se ha producido un error al registrarse');
            }
        }
    });
    return false;
}
 
function traerUsuario(id) {
    var usuario = {
        id: id,
        metodo: 'traerUsuario' 
    }
    $.ajax({
        url: "../php/usuario.php",
        method: "POST",
        data: usuario,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (usuario_response) {
            var usuarioGuardado = JSON.parse(usuario_response);
            $('#usuario').val(usuarioGuardado.usuario);
            $('#pass').val(usuarioGuardado.password);
            $('#nombre').val(usuarioGuardado.nombre);
            $('#correo').val(usuarioGuardado.correo);
            $('#telefono').val(usuarioGuardado.telefono);
            $('#pregunta').val(usuarioGuardado.pregunta_secreta);
            $('#respuesta').val(usuarioGuardado.respuesta);
            $('#direccion').val(usuarioGuardado.direccion);
            $('#idUsuarios').val(usuarioGuardado.idUsuarios);
        }
    });
}

function editarUsuario() {
    var usuario = {
        usuario: $('#usuario').val(),
        password: $('#pass').val(),
        nombre: $('#nombre').val(),
        correo: $('#correo').val(),
        direccion: $('#direccion').val(),
        telefono: $('#telefono').val(),
        idUsuarios: $('#idUsuarios').val(),
        metodo: 'editar'
    }
    $.ajax({
        url: "../php/usuario.php",
        method: "POST",
        data: usuario,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (usuario_response) {
            console.error(usuario_response);
            if (usuario_response == 'Exito') {
                alert('Se ha modificado con éxito!');
                window.location.href = 'listarUsuarios.html';
            } else {
                alert('Se ha producido un error al modificar');
                
            }
        }
    });
    return false;
}

function listarUsuarios() {
    var usuario = {
        metodo: "listar"
    }
    $.ajax({
        url: "../php/usuario.php",
        method: "POST",
        data: usuario,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (usuario_response) {
            var usuarios = JSON.parse(usuario_response);
            usuarios.map(function (e) {
                var tr = document.createElement('tr');
                var nombre = document.createElement('td');
                $(nombre).text(e.nombre);
                $(tr).append(nombre);
                var correo = document.createElement('td');
                $(correo).text(e.correo);
                $(tr).append(correo);
                var usuario = document.createElement('td');
                $(usuario).text(e.usuario);
                $(tr).append(usuario);
                var direccion = document.createElement('td');
                $(direccion).text(e.direccion);
                $(tr).append(direccion);
                $('<td><a href="editarUsuario.html?' + e.idUsuarios + '"><i class="far fa-edit fa-lg verde"></i></a></td>').appendTo(tr);
              //  $('<td><a class="block" onclick="bloquearUsuario(' + e.idUsuarios + ')"><i class="fas fa-ban fa-lg rojo"></i></a></td>').appendTo(tr);
                $('#listaUsuarios').append(tr);
            })
        }
    });
}