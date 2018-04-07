<?php
$usuario = "root";
$password = "";
$servername = "localhost";
$dbname = "proyecto_lunes_noche";
$conn = new mysqli($servername,$usuario,$password,$dbname);

if($_POST["metodo"] == "select"){
    $sql = "select * from Usuarios where usuario ='".$_POST["usuario"]."'";
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        echo json_encode(mysqli_fetch_assoc($result));
    }else{
        echo "Error";
    }
}else if($_POST["metodo"] == "traerUsuario"){
    $sql = "select * from Usuarios where idUsuarios =".$_POST["id"];
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        echo json_encode(mysqli_fetch_assoc($result));
    }else{
        echo "Error";
    }
}else if($_POST["metodo"] == "listar"){
    $sql = "select * from Usuarios";
    $usuarios = array();
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        while($row = mysqli_fetch_assoc($result)){
            array_push($usuarios, $row);
        }
        echo json_encode($usuarios);
    }else{
        echo "Error";
    }
}else{
    if($_POST["metodo"] == "registro"){
        $sql = "insert into Usuarios (nombre,direccion,telefono,correo,
        pregunta_secreta,respuesta,usuario,password,rol) values ('"
        .$_POST["nombre"]."', '"
        .$_POST["direccion"]."', '"
        .$_POST["telefono"]."', '"
        .$_POST["correo"]."', '"
        .$_POST["pregunta"]."', '"
        .$_POST["respuesta"]."', '"
        .$_POST["usuario"]."', '"
        .$_POST["password"]."', '1')";
        
    }else if($_POST["metodo"] == "editar"){
        
        $sql = "update usuarios set
        nombre='".$_POST["nombre"]."',
        correo='".$_POST["correo"]."',
        telefono='".$_POST["telefono"]."',
        direccion='".$_POST["direccion"]."',
        usuario='".$_POST["usuario"]."',
        password='".$_POST["password"]."'
        where idUsuarios = ".$_POST["idUsuarios"];
    
}
    if($conn->query($sql) === TRUE){
        echo "Exito";
    }else{
        echo "Error";
    }

}

$conn->close();
?>