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
    $('<a class="dropdown-item" href="misordenes.html">Mis Ordenes</a>').appendTo(div);
    $('<a class="dropdown-item" href="javascript:void(0);" onclick="logout()">Logout</a>').appendTo(div);
    $('#login').parent().append(div);

    if(!sessionStorage.getItem('carrito')){

        $('<h1>El Carrito esta Vacio</h1>').appendTo('#productosContainer')
    }else{
        construirCarrito();
    }


} else {
    alert('Tiene que estar Registrado para agregar productos a el Carrito');
    window.location.href = "login.html"
}
