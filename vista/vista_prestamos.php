<?php
session_start();
if ($_SESSION['us_tipo'] == 1) {
    include_once('layouts/header.php');
?>

    <title>Adm | Prestamos</title>
    <link rel="shortcut icon" type="image/x-icon" href="../img/favicon.ico" />
    <!-- Tell the browser to be responsive to screen width -->
    <?php
    include_once('layouts/nav.php');
    ?>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Prestamo de Libros
                        </h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="../vista/adm_catalogo.php">Home</a></li>
                            <li class="breadcrumb-item active">Prestamo de Libros</li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>

        <!-- Main content -->
        <section>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-6">
                        <div class="card card-success">
                            <div class="card-header">
                                <h3 class="card-title">Prestamos de Libros</h3>
                                <!-- <button type="button" id="actuprod" title="Actualizando el nuevo stock" class="btn bg-gradient-primary btn-sm m-2">Actualizar Datos</button> -->
                            </div>
                            <div class="card-body">
                                <header>
                                    <div class="form-row">
                                        <!-- <div class="form-group col-md-6">
                                            <label for="nombre">Seleccionar Area de envio:</label>
                                            <select name="nombre" id="nombre" class="form-control nombre">
                                                <option value="" selected>SELECIONE EL AREA DE ENVIO...</option>
                                                <option value="COCINA PERSONAL">COCINA PERSONAL</option>
                                                <option value="DOSIFICACION DE HARINAS">DOSIFICACION DE HARINAS</option>
                                                <option value="DECORACION DE TORTAS">DECORACION DE TORTAS</option>
                                                <option value="DOSIFICACION DE HUEVOS">DOSIFICACION DE HUEVOS</option>
                                                <option value="HORNO">HORNO</option>
                                                <option value="MASITAS SALADAS">MASITAS SALADAS</option>
                                                <option value="ELABORACION DE GALLETAS">ELABORACION DE GALLETAS</option>
                                                <option value="MASITAS DULCES">MASITAS DULCES</option>
                                                <option value="POSTRES Y TORTAS EN VASO">POSTRES Y TORTAS EN VASO</option>
                                                <option value="PRODUCCION TORTAS">PRODUCCION TORTAS</option>
                                                
                                            </select>                                            
                                        </div> -->
                                        <div class="form-group col-md-6">
                                            <label for="nombre22">Clientes</label>
                                            <select name="nombre22" id="nombre22" class="form-control select2" style="width: 100%;">
                                            </select>
                                        </div>                                       
                                        
                                    </div>
                                </header>
                                <div class="card-body">
                                    <table id="tabla_prestamos" class="table display compact table-striped dt-responsive " style="width:100%">
                                        <thead>
                                            <tr>
                                                <th>Titulo</th>
                                                <th>Nom Autor</th>
                                                <th>Lote</th>
                                                <th>Prestar</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="card card-success">
                            <div class="card-header">
                                <h6 class="card-title">Devolucion de Libros</h6>
                            </div>
                            <div class="card-body">
                                    <table id="tabla_devoluciones" class="table display compact table-striped dt-responsive " style="width:100%">
                                        <thead>
                                            <tr>
                                                <th>Titulo</th>
                                                <th>cliente</th>                                                
                                                <th>Devolucion</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                        </div>
                    </div>
                </div>



                <div class="card card-success">
                    <div class="card-header">
                        <h6 class="card-title">Libro para prestar</h6>                        
                    </div>

                    <div id="tablaexp" class="card-body">
                        <table class="envios table display table-striped dt-responsive text-nowrap" width="100%">
                            <thead class="table-success">
                                <tr>
                                    <!-- <th>id</th> -->
                                    <th scope="col">Titulo</th>
                                    <th scope="col">Nombre Autor</th>
                                    <th scope="col">Lote</th>
                                    <th scope="col">Accion</th>
                                </tr>
                            </thead>
                            <tbody id="lista_dis" class="table-active">

                            </tbody>
                        </table>
                        <!-- <div class="info-box mb-3 bg-info">
                            <span class="info-box-icon"><i class="ion ion-ios-cart-outline"></i></span>
                            <div class="info-box-content">
                                <span class="info-box-text text-left ">TOTAL PARCIAL</span>
                                <span class="info-box-number" id="total"></span>
                            </div>
                        </div> -->
                        <div class="row justify-content-between">
                            <div class="col-xs-12 col-md-6">
                                <a href="#" class="btn btn-success btn-block" id="procesar_envio">Enviar Lista</a>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </section>
    </div>

    <div class="modal fade" id="vista_lista" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="card card-success">
                    <div class="card-header">
                        <h3 class="card-title">Registros de Prestamo</h3>
                        <button data-dismiss="modal" aria-label="close" class="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label for="titulo">Titulo: </label>
                            <span id="titulo"></span>
                        </div>
                        <div class="form-group">
                            <label for="cliente">Cliente: </label>
                            <span id="cliente"></span>
                        </div>
                        <div class="form-group">
                            <label for="fecha">Fecha de Prestamo: </label>
                            <span id="fecha"></span>
                        </div>
                        <div class="form-group">
                            <label for="dias">Dias de Prestamo: </label>
                            <span id="dias"></span>
                        </div>
                        
                    </div>
                    <div class="card-footer">

                        <button type="button" data-dismiss="modal" class="btn btn-outline-secondary float-right m-1">Cerrar</button>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /.content-wrapper -->
    <?php
    include_once('layouts/footer.php');
    ?>
<?php } else {
    header('Location: ../index.php');
}


?>
<script src="../js/Prestamos.js"></script>
<script src="../js/Devoluciones.js"></script>