<?php
include '../modelo/Cliente.php';

    $cliente = new Cliente();

    if ($_POST['funcion'] == 'crear') {

    $nombrecliente = $_POST['nombre'];
    $email = $_POST['email'];
    $celular = $_POST['celular'];

    $cliente->crear($nombrecliente,$email,$celular);
    }

    if ($_POST['funcion'] == 'editar') {

    $id = $_POST['id'];
    $nombrecliente = $_POST['nombre'];
    $email = $_POST['email'];
    $celular = $_POST['celular'];

    $cliente->editar($id,$nombrecliente,$email,$celular);
    }

    if ($_POST['funcion'] == 'listar') {

    $cliente->mostrar_data();
    $json = array();
    foreach ($cliente->objetos as $objeto) {
        $json['data'][] = $objeto;
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
    
    }
    if ($_POST['funcion']=='rellenar_clientes') {
        $cliente->mostrar_data();
        $json = array();
        foreach ($cliente->objetos as $objeto) {
            $json[]=array(
                'id'=>$objeto->id_cliente,
                'nombre'=>$objeto->nombre_cliente
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
    if ($_POST['funcion'] == 'borrar') {

    $id = $_POST['id'];
    $cliente->borrar($id);
    }    

?>