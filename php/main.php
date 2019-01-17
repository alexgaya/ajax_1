<?php
header("Access-Control-Allow-Origin: *");

$output = '';

if(isset($_GET['action'])){
    switch ($_GET['action']){
        case "crear":
            //$output = todosLosDepartamentos();
            $output .= todosLosPuestos();
            break;
        
        case "ver":
            $output = todosLosDepartamentos();
            break;
        
        case "table":
            $value = $_GET['id'];
            $output = getJson($value);
            break;
        
        default :
            break;
    }
}

if(isset($_POST['puestos']) && isset($_POST['nombre']) && isset($_POST['email']) && isset($_POST['telefono'])){
    /*$output = var_dump($_POST);
    $output .= "usuario guardado con éxito";*/
    $id_puesto = htmlspecialchars(strip_tags($_POST['puestos']));
    $nombre = htmlspecialchars(strip_tags($_POST['nombre']));
    $email = htmlspecialchars(strip_tags($_POST['email']));
    $telefono = htmlspecialchars(strip_tags($_POST['telefono']));
    
    $conn = conexion();
    $query = "INSERT INTO personas (nombre, email, telefono, id_puesto) ".
            "VALUES (:nombre, :email, :telefono, :id_puesto);";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':telefono', $telefono);
    $stmt->bindParam(':id_puesto', $id_puesto);
    
    if($stmt->execute()){
        $output = "Usuario guardado con éxito";
    }else{
        $output = "Error al guardar usuario, inténtelo de nuevo";
    }
}

function conexion(){
    try{
        $conn = new PDO("mysql:host=localhost;dbname=ajax_1", 'root', '');
        $conn->query("SET NAMES 'utf8'");
        return $conn;
    } catch (PDOException $exception) {
        echo "Error en la conexión: " .$exception->getMessage();
    }
}

function todosLosDepartamentos(){
    $conn = conexion();
    $query = "SELECT * FROM departamentos;";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $resp = "<select name='departamentos' required><option value='' disabled selected>Selecciona un departamento</option>";
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $resp .= "<option value='" . $row['id'] . "'>" . $row['nombre'] . "</option>";
    }
    $resp .= "</select>";
    return $resp;
}

function todosLosPuestos(){
    $conn = conexion();
    $query = "SELECT * FROM puestos;";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $resp = "<select name='puestos' required><option value='' disabled selected>Selecciona un puesto</option>";
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $resp .= "<option class='" . $row['id_departamento'] . "' value='" . $row['id'] . "'>" . $row['nombre'] . "</option>";
    }
    $resp .= "</select>";
    return $resp;
}

function getJson($id){
    $conn = conexion();
    $query = "SELECT puestos.nombre AS 'puestos.nombre', personas.nombre AS 'personas.nombre', personas.email AS 'personas.email', personas.telefono AS 'personas.telefono' ".
            "FROM `personas` INNER JOIN `puestos` ON (puestos.id = personas.id_puesto) ".
            "WHERE id_departamento = $id;";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $resp = [];
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $fila = ["puesto" => $row['puestos.nombre'], "nombre" => $row['personas.nombre'], "email" => $row['personas.email'], "telefono" => $row['personas.telefono']];
        array_push($resp, $fila);
    }
    
    $json = json_encode($resp);
    
    return $json;
}


echo $output;
?>