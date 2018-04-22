<?php
date_default_timezone_set("America/Costa_Rica");

$usuario = "root";
$password = "";
$servername = "localhost";
$dbname = "proyecto_lunes_noche";
$conn = new mysqli($servername, $usuario, $password, $dbname);
mysqli_set_charset($conn,"utf8");

if(isset($_POST["metodo"]) && $_POST["metodo"] == "select"){
    $sql = "select * from Usuarios where usuario ='".$_POST["usuario"]."'";
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        echo json_encode(mysqli_fetch_assoc($result));
    }else{
        echo "Error";
    }
}else if(isset($_POST["metodo"]) && $_POST["metodo"] == "listar"){
    $sql = "SELECT * FROM proyecto_lunes_noche.pedidos
            INNER JOIN usuarios
            ON pedidos.idUsuarios = usuarios.idUsuarios";
    $productos = array();
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        while($row = mysqli_fetch_assoc($result)){
            array_push($productos, $row);
        }
        echo json_encode($productos);
    }else{
        echo "Error";
    }
}else if(isset($_POST["metodo"]) && $_POST["metodo"] == "detalle"){
    $sql = "select pe.idPedidos, u.nombre, pe.fecha, pro.nombre, pro.precio, php.cantidad from pedidos as pe, productos as pro, pedidos_has_productos as php, usuarios as u where pe.idUsuarios = u.idUsuarios and pe.idPedidos = php.idpedidos and php.idproductos = pro.idproductos and pe.idPedidos = ".$_POST["idPedidos"];
    
    $productos = array();
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        while($row = mysqli_fetch_assoc($result)){
            array_push($productos, $row);
        }
        echo json_encode($productos);
    }else{
        echo "Error";
    }
}else if($_POST["metodo"] == "borrar"){
        $sql= "DELETE FROM pedidos WHERE idPedidos=".$_POST["id"];
    if($conn->query($sql)===TRUE){
            echo "pedido borrado con exito";
            }else{
                    die('Error al borrar Pedido');
            }
    }







else{
    $sql = "insert into pedidos (fecha, idUsuarios,total) values(
        '".$_POST["fecha"]."',
        ".$_POST["idUsuarios"].",
        '".$_POST["total"]."'
        )";

         if($conn->query($sql)===TRUE){
            $last_id = $conn->insert_id;
            }else{
                    die('Error al guardar Pedido');
            }


            $producto = current($_POST["idproductos"]);
            $cantidad = current($_POST["cantidad"]);
            while ($producto) {
                $sql = "insert into pedidos_has_productos (idproductos,idpedidos, cantidad)
                values (".$producto.",".$last_id.",".$cantidad.")";

                if($conn->query($sql)===TRUE){
                    $error = false;
                }else{
                        die('Error al guardar Pedido');
                }

                $producto = next($_POST["idproductos"]);
                $cantidad = next($_POST["cantidad"]);
            }

            echo "Pedido porcesado con exito";
    

}

$conn->close();
?>


///PREUBA