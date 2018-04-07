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
    $sql = "select * from pedidos";
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
        $sql= "DELETE FROM productos WHERE idproductos=".$_POST["id"];
    }else{
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

            while ($producto) {
                $sql = "insert into pedidos_has_productos (idproductos,idpedidos)
                values (".$producto.",".$last_id.")";

                if($conn->query($sql)===TRUE){
                    $error = false;
                }else{
                        die('Error al guardar Pedido');
                }

                $producto = next($_POST["idproductos"]);
            }

            echo "Pedido porcesado con exito";
    

}

$conn->close();
?>