<?php
    include '../modelo/Prestamo.php';
    include_once '../modelo/conexion.php';
    $prestamo=new Prestamo();

    if ($_POST['funcion']=='registrar_envio') {
        $nombre=$_POST['nombre'];      
        // $prestamo=json_decode($_POST['json']);
        $id_libpres=$_POST['id_librops']; 
        date_default_timezone_set('America/La_Paz');
        $fechaprestamo=date('Y-m-d');
        $diasprestamo=1;

        $prestamo->crear($id_libpres, $nombre, $fechaprestamo, $diasprestamo);
        $prestamo->reducirlote($id_libpres);

    }        
    if ($_POST['funcion2'] == 'listar') {

        $prestamo->mostrar_data();
        $json = array();
        foreach ($prestamo->objetos as $objeto) {
            $json['data'][] = $objeto;
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;        
    }              
    if ($_POST['funcion'] == 'borrar') {

        $id = $_POST['id'];
        $$id_libpres= $_POST['id_libro'];
        $prestamo->devolverlote($id_libpres);
        $prestamo->borrar($id);
    }     
    // if ($_POST['funcion2'] == 'devolver') {

    //     $$id_libpres= $_POST['id_lib'];
    //     $prestamo->devolverlote($id_libpres);
        
    // }        
?>