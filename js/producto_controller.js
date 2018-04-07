function catalogo() {
    var producto = {
        metodo: "listar"
    }
    $.ajax({
        url: "../php/producto.php",
        method: "POST",
        data: producto,
        error: function (xhr) {
            console.log(xhr.statusText)
        },
        success: function (producto_response) {
            var productos = JSON.parse(producto_response)
            $('#catalogoContainer').hide()
            var contador = 0
            var numPagina = 1
            productos.map(function (producto) {
                $('<div id="' + producto.idproductos + '" class="col-lg-4 col-sm-6 portfolio-item pagina' + numPagina + '"><div class="card h-100"><a href="producto.html?' + producto.idproductos + '"><img class="card-img-top" src="imgs/' + producto.imagen + '" alt=""></a><div class="card-body"><h4 class="card-title"><a href="producto.html?' + producto.idproductos + '" class="nombre">' + producto.nombre + '</a></h4><p class="card-text" class="descripcion">' + producto.descripcion + '</p><p class="card-text precio">Precio: ' + producto.precio + ' colones</p></div></div></div>').appendTo('#catalogoContainer');

                if (producto.precioOferta) {

                    var inicioOferta = producto.fechaInicioOferta.replace(/\-/g, ',');
                    inicioOferta = new Date(inicioOferta);
                    var finOferta = producto.fechaFinOferta.replace(/\-/g, ',');
                    finOferta = new Date(finOferta);
                    var hoy = new Date();
                    hoy = hoy.setHours(0, 0, 0, 0);

                    if (inicioOferta <= hoy && finOferta >= hoy) {

                        $('#' + producto.idproductos).find('.precio').addClass("oldPrice");
                        $('<p class="oferta">Oferta: ₡ ' + producto.precioOferta + '</p>').appendTo('#' + producto.idproductos + ' .card-body')
                    }

                }

                contador++
                if (contador == 6) {
                    contador = 0
                    numPagina++
                }
            })
            $('.portfolio-item').hide()
            $('.pagina1').show()
            $('#catalogoContainer').show()
            var totalPaginas = Math.ceil(productos.length / 6)
            for (var i = 1; i <= totalPaginas; i++) {
                $(' <li class="page-item"><a class="page-link" onclick="paginacion(' + i + ')">' + i + '</a></li>').appendTo('.pagination')
            }
        }
    })
}

function traerProducto(id) {
    var producto = {
        id: id,
        metodo: "traerProducto"
    }
    $.ajax({
        url: "../php/producto.php",
        method: "POST",
        data: producto,
        error: function (xhr) {
            console.log(xhr.statusText)
        },
        success: function (producto_response) {
            sessionStorage.setItem('productoActual', producto_response);
            var producto = JSON.parse(producto_response)
            $('#imagen').attr('src', 'imgs/' + producto.imagen)
            $('#nombre').text(producto.nombre)
            $('#descripcion').text(producto.descripcion)
            $('#marca').append(producto.marca)
            $('#modelo').append(producto.modelo)
            $('#precio').append("₡ " + producto.precio + " colones i.v.i")
            var caracteristicas = producto.caracteristicas.split(';')
            caracteristicas.map(function (caracteristica) {
                if (caracteristica.trim())
                    $('<li>' + caracteristica + '</li>').appendTo('#caracteristicas')
            })

            if (producto.precioOferta) {

                var inicioOferta = producto.fechaInicioOferta.replace(/\-/g, ',');
                inicioOferta = new Date(inicioOferta);
                var finOferta = producto.fechaFinOferta.replace(/\-/g, ',');
                finOferta = new Date(finOferta);
                var hoy = new Date();
                hoy = hoy.setHours(0, 0, 0, 0);

                if (inicioOferta <= hoy && finOferta >= hoy) {

                    $('#precio').addClass("oldPrice");
                    $('<p class="oferta">Oferta:₡ ' + producto.precioOferta + '</p>').insertAfter('#precio')
                }

            }
        }
    })
}

function paginacion(numero) {
    $('.portfolio-item').hide()
    $('.pagina' + numero).show()
    window.scrollTo(0, 0)
}

function agregarCarrito() {
    if (sessionStorage.getItem('carrito')) {
        var carrito = JSON.parse(sessionStorage.getItem('carrito'));
    } else {
        var carrito = [];
    }
    var productoActual = JSON.parse(sessionStorage.getItem('productoActual'))

    carrito.push(productoActual);
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    alertify.alert("El producto se agregó a su carro de compras");
}

function traerCategorias() {
    var categoria = {
        metodo: "listar"
    }
    $.ajax({
        url: "../php/categoria.php",
        method: "POST",
        data: categoria,
        error: function (xhr) {
            console.log(xhr.statusText)
        },
        success: function (categoria_response) {
            var categorias = JSON.parse(categoria_response);
            categorias.map(function (categoria) {
                $('<option value="' + categoria.idcategoria + '">' + categoria.nombre + '</option>').appendTo('#categoria');
            })
        }
    })
}
//registrar Producto
$("form#producto").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
        url: "../php/producto.php",
        type: 'POST',
        data: formData,
        success: function (data) {
            alert(data)
        },
        cache: false,
        contentType: false,
        processData: false
    });
});

function listarProductos() {
    var producto = {
        metodo: "listar"
    }
    $.ajax({
        url: "../php/producto.php",
        method: "POST",
        data: producto,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (producto_response) {
            var productos = JSON.parse(producto_response);
            productos.map(function (e) {
                var tr = document.createElement('tr');
                var nombre = document.createElement('td');
                $(nombre).text(e.nombre);
                $(tr).append(nombre);
                var descripcion = document.createElement('td');
                $(descripcion).text(e.descripcion);
                $(tr).append(descripcion);
                var precio = document.createElement('td');
                $(precio).text(e.precio);
                $(tr).append(precio);
                var marca = document.createElement('td');
                $(marca).text(e.marca);
                $(tr).append(marca);
                $('<td class="center"><a href="editarProducto.html?' + e.idproductos + '"><i class="far fa-edit fa-lg verde"></i></a></td>').appendTo(tr);
                $('<td class="center"><a href="agregarOferta.html?' + e.idproductos + '"><i class="fas fa-tags fa-lg azul"></i></a></td>').appendTo(tr);
                $('<td class="table__icons"><a class="block" onclick="borrarProducto(' + e.idproductos + ')"><i class="fas fa-trash fa-lg rojo"></i></a></td>').appendTo(tr);
                $('#listaProductos').append(tr);
            })
        }
    });
}

function logout() {
    sessionStorage.removeItem('usuarioLogueado');
    window.location.href = 'index.html';
}


function traerProductoEditar(id) {
    var producto = {
        id: id,
        metodo: "traerProducto"
    }
    $.ajax({
        url: "../php/producto.php",
        method: "POST",
        data: producto,
        error: function (xhr) {
            console.log(xhr.statusText)
        },
        success: function (producto_response) {
            var producto = JSON.parse(producto_response);
            $('input[name="nombre"]').val(producto.nombre);
            $('input[name="descripcion"]').val(producto.descripcion);
            $('input[name="modelo"]').val(producto.modelo);
            $('input[name="marca"]').val(producto.marca);
            $('input[name="precio"]').val(producto.precio);
            $('input[name="cantidad"]').val(producto.cantidad);
            $('input[name="idproductos"]').val(producto.idproductos);
            var caracteristicas = producto.caracteristicas.split(';');
            $('input[name="carac1"]').val(caracteristicas[0]);
            if (caracteristicas.length > 1) {
                for (var i = 1; i < caracteristicas.length; i++) {
                    $('<div class="controls" ><input class="caracteristica" name="carac' + (i + 1) + '" type="text" value="' + caracteristicas[i] + '"><label id="quitar" onclick="quitar(this)"> <i class="fas fa-minus-square fa-lg"></i></label></div>').appendTo('#caracteristicas');
                }
            }
        }
    })
}
$("form#editarProducto").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
        url: "../php/producto.php",
        type: 'POST',
        data: formData,
        success: function (data) {
            alert(data)
        },
        cache: false,
        contentType: false,
        processData: false
    });
});

function traerProductoOferta(id) {
    var producto = {
        id: id,
        metodo: "traerProducto"
    }
    $.ajax({
        url: "../php/producto.php",
        method: "POST",
        data: producto,
        error: function (xhr) {
            console.log(xhr.statusText)
        },
        success: function (producto_response) {
            var productoActual = JSON.parse(producto_response);
            $('#nombre').text(productoActual.nombre);
            $('#modelo').text(productoActual.modelo);
            $('#marca').text(productoActual.marca);
            $('#id').val(productoActual.idproductos);
            $('#precio').append(productoActual.precio);
        }
    })
}

function agregarOferta() {
    var producto = {
        fechaInicioOferta: $('#fechaInicioOferta').val(),
        fechaFinOferta: $('#fechaFinOferta').val(),
        precioOferta: $('#precioOferta').val(),
        id: $('#id').val(),
        metodo: "agregarOferta"
    }
    $.ajax({
        url: "../php/producto.php",
        method: "POST",
        data: producto,
        error: function (xhr) {
            console.log(xhr.statusText)
        },
        success: function (producto_response) {
            alert(producto_response)
        }
    })
    return false;
}

function construirCarrito() {
    var productos = JSON.parse(sessionStorage.getItem("carrito"));

    productos.map(function (producto) {

        $(`<div class="row producto" id=` + producto.idproductos + `>
        <div class="col-lg-4">
          <img class="img-fluid rounded mb-4" src="imgs/` + producto.imagen + `" alt="">
        </div>
        <div class="col-lg-8">
          <h5 class="nombre">` + producto.nombre + `</h5>
          <p class="descripcion">` + producto.descripcion + `</p>
          <p class="marca"><b>Marca: </b>` + producto.marca + ` </p>
          <p class="modelo"><b>Modelo: </b>` + producto.modelo + ` </p>
          <h6 class="precio"><b>Precio: ₡<b> </h6>
          <label><b>Cantidad:<b></label>
          <input  type="number" value="1" onchange="calcularCantidad()">
        </div>
      </div> `).appendTo('#productosContainer')

        if (producto.precioOferta) {

            var inicioOferta = producto.fechaInicioOferta.replace(/\-/g, ',');
            inicioOferta = new Date(inicioOferta);
            var finOferta = producto.fechaFinOferta.replace(/\-/g, ',');
            finOferta = new Date(finOferta);
            var hoy = new Date();
            hoy = hoy.setHours(0, 0, 0, 0);

            if (inicioOferta <= hoy && finOferta >= hoy) {

                var precio = producto.precioOferta;

            } else {
                var precio = producto.precio
            }

        } else {
            var precio = producto.precio
        }

        $('#' + producto.idproductos).find('.precio').append(precio);
        calcularCantidad();
    })
}

function calcularCantidad(elemento) {

    var total = 0;

    $('.producto').each(function () {

        var cantidad = parseInt($(this).find('input').val());
        total += parseInt($(this).find('.precio').text().replace(/[^\d]/g, '')) * cantidad

    })

    $('#total label span').text(total);


}

function procesarPedido() {

    var pedido = {};
    pedido.idUsuarios = JSON.parse(sessionStorage.getItem('usuarioLogueado')).idUsuarios;
    pedido.total = $('#total label span').text();
    var idproductos = [];
    $('.producto').each(function () {

        idproductos.push($(this).attr('id'))
    });

    pedido.idproductos = idproductos;
    pedido.fecha = new Date();

    $.ajax({
        url: "../php/pedido.php",
        method: "POST",
        data: pedido,
        error: function (xhr) {
            console.log(xhr.statusText)
        },
        success: function (pedido_response) {
            alert(pedido_response);
            window.location.href = "catalogo.html";
        }
    })

}

function listarPedidos() {

    var productos = JSON.parse(sessionStorage.getItem("carrito"));

    var producto = {
        metodo: "listar" 
    }
    $.ajax({
        url: "../php/pedido.php",
        method: "POST",
        data: producto,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (producto_response) {
            var productos = JSON.parse(producto_response);
            productos.map(function (e) {
                var tr = document.createElement('tr');

                var nombre = document.createElement('td');
                $(nombre).text(e.idUsuarios);
                $(tr).append(nombre);

                var fecha = document.createElement('td');
                $(fecha).text(e.fecha);
                $(tr).append(fecha);

                var total = document.createElement('td'); 
                $(total).text(e.total);
                $(tr).append(total);
                
                $('<td class="table__icons"><a class="block" onclick="borrarProducto(' + e.idPedidos + ')"><i class="fas fa-trash fa-lg rojo"></i></a></td>').appendTo(tr);
                $('#listarPedidos').append(tr);
            })
        }
    });
}

function borrarProducto(id){
    if(confirm("¿Estas seguro que desea borrar al producto?")){
        var borrar ={
            id: id,
            metodo: "borrar"
        }
        $.ajax({
            url: "../php/producto.php",
            data: borrar,
            method: 'POST',
            error: function(xhr){
                alert("An error ocurred: " + xhr.status + " " + xhr.statusText);
            },
            success: function (respuesta) {
                
                location.reload();
            }
        });
    }
}


