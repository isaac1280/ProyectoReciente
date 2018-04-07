 <?php
date_default_timezone_set("America/Costa_Rica");

$usuario = "root";
$password = "";
$servername = "localhost"; 
$dbname = "proyecto_lunes_noche";
$conn = new mysqli($servername, $usuario, $password, $dbname);

mysqli_set_charset($conn,"utf8");

if($_POST["metodo"] == "select"){
    $sql = "select * from Usuarios where usuario ='".$_POST["usuario"]."'";
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        echo json_encode(mysqli_fetch_assoc($result));
    }else{
        echo "Error";
    }
}else if($_POST["metodo"] == "traerProducto"){
    $sql = "select * from productos where idproductos =".$_POST["id"];
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        echo json_encode(mysqli_fetch_assoc($result));
    }else{
        echo "Error";
    }
}else if($_POST["metodo"] == "listar"){
    $sql = "select * from productos";
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
}else{
    if($_POST["metodo"] == "registrar"){
        $target_dir = "../imgs/";
        $target_file = $target_dir . basename($_FILES["imagen"]["name"]);
        if ( 0 < $_FILES['imagen']['error'] ) {
            echo 'Error: ' . $_FILES['imagen']['error'] . '<br>';
        }
        else {
            move_uploaded_file($_FILES['imagen']['tmp_name'], $target_file);
            echo "Exito";
        }
        $caracteristicas = array();
        foreach ($_POST as $key => $value){
            if(preg_match('/carac/',$key)){
                array_push($caracteristicas, $value);
            }
        }
        $caracteristicas = join(';', $caracteristicas);
        $sql = "insert into productos (nombre,descripcion,modelo,idCategoria,precio,caracteristicas,cantidad,imagen,marca,fechaIngreso) values ('"
        .$_POST["nombre"]."', '"
        .$_POST["descripcion"]."', '"
        .$_POST["precio"]."', '"
        .$caracteristicas."', "
        .$_POST["cantidad"].", '"
        .$_FILES['imagen']['name']."', '"
        .$_POST["marca"]."', '"
        .date("d/m/Y")."')";
    }else if($_POST["metodo"] == "editar"){
        $caracteristicas = array();
        foreach ($_POST as $key => $value){
            if(preg_match('/carac/',$key)){
                array_push($caracteristicas, $value);
            }
        }
        $caracteristicas = join(';', $caracteristicas);
        if(is_uploaded_file($_FILES['imagen']['tmp_name'])){
            $target_dir = "../imgs/";
            $target_file = $target_dir . basename($_FILES["imagen"]["name"]);
            if ( 0 < $_FILES['imagen']['error'] ) {
               echo 'Error: ' . $_FILES['imagen']['error'] . '<br>';
            }
            else {
              move_uploaded_file($_FILES['imagen']['tmp_name'], $target_file);
              echo "Exito";
            }
            $sql = "update productos set 
            nombre='".$_POST["nombre"]."',
            descripcion='".$_POST["descripcion"]."', 
            idCategoria=".$_POST["categoria"].",
            precio='".$_POST["precio"]."',
            caracteristicas='".$caracteristicas."',
            cantidad=".$_POST["cantidad"].",
            marca='".$_POST["marca"]."',
            imagen='".$_FILES['imagen']['name']."'
            where idproductos = ".$_POST["idproductos"];
        }else{
            $sql = "update productos set 
            nombre='".$_POST["nombre"]."',
            descripcion='".$_POST["descripcion"]."',
            precio='".$_POST["precio"]."',
            caracteristicas='".$caracteristicas."',
            cantidad=".$_POST["cantidad"].",
            marca='".$_POST["marca"]."'
            where idproductos = ".$_POST["idproductos"];
        } 
    }else if ($_POST["metodo"]=="agregarOferta"){
        $sql ="update productos set
        precioOferta='".$_POST["precioOferta"]."',
        fechaInicioOferta='".$_POST["fechaInicioOferta"]."',
        fechaFinOferta='".$_POST["fechaFinOferta"]."'
        where idproductos=".$_POST["id"];
    }else if($_POST["metodo"] == "borrar"){
        $sql= "DELETE FROM productos WHERE idproductos=".$_POST["id"];
    }
    
    if($conn->query($sql) === TRUE){
        echo "Exito";
    }else{
        echo "Error";
    }
    

}



$conn->close();
?>