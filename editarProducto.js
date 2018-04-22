var usuarioGuardado = sessionStorage.getItem('usuarioLogueado');
if (usuarioGuardado) {
    usuarioGuardado = JSON.parse(usuarioGuardado);
    $('#login').text(usuarioGuardado.usuario);
    $('#login').parent().addClass('dropdown');
    $('#login').addClass('dropdown-toggle');
    $('#login').attr('href', '#');
    $('#login').attr('data-toggle', 'dropdown');
    $('#login').attr('aria-haspopup', 'true');
    $('#login').attr('aria-expanded', 'false');
    var div = document.createElement('div');
    $(div).addClass('dropdown-menu', 'dropdown-menu-right');
    $(div).attr('aria-labelledby', 'login');
    $('<a class="dropdown-item" href="admin.html">Mi Perfil</a>').appendTo(div);
    $('<a class="dropdown-item" href="mispedidos.html">Mis Ordenes</a>').appendTo(div);
    $('<a class="dropdown-item" href="javascript:void(0);" onclick="logout()">Cerrar Sesión</a>').appendTo(div);
    $('#login').parent().append(div);
    var id = window.location.search;
    id = id.replace('?', '');
    traerProductoEditar(id);
    traerCategorias();
}
var numCar = 2;
function agregar() {
    $('<div class="controls" ><input class="característica" name="carac' + numCar + '" type="text"><label id="quitar" onclick="quitar(this)"> <i class="fas fa-minus-square fa-lg"></i></label></div>').appendTo('#caracteristicas');
    numCar++;
}
function quitar(elemento) {
    $(elemento).parent().remove();
}