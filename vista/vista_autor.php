<?php
session_start();
if ($_SESSION['us_tipo'] == 1) {
    include_once('layouts/header.php');
?>

    <title>Adm | Autor</title>
    <link rel="shortcut icon" type="image/x-icon" href="../img/favicon.ico" />
    <!-- Tell the browser to be responsive to screen width -->
    <?php
    include_once('layouts/nav.php');
    ?>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Ingreso de Autor
                            <!-- <div class="card-header with-border"> -->
                            <button id="button-crear" type="button" data-toggle="modal" data-target="#crearautor" class="btn bg-gradient-primary ml-2">
                                Nuevo Autor                                
                            </button>
                            <!-- </div>-->
                        </h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Ingreso de Autor</li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>

        <section>
            <div class="container-fluid">
                <div class="card card-success">
                    
                    <div class="card-header">
                        <h3 class="card-title">Lista de Autores</h3>
                    </div>
                    <div class="card-body table-responsive">
                        
                        <table id="tabla_autor" class="table display table-striped dt-responsive text-nowrap" style="width:100%">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre Autor</th>                                                                  
                                    <th>Funciones</th>
                                </tr>
                            </thead>
                            <tbody >
                                <!-- class="table-active"  -->
                            </tbody>
                        </table>
                    </div>
                    <div class="card-footer">

                    </div>
                </div>
            </div>
        </section>
    </div>
       

    <div class="modal fade" id="crearautor" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="card card-success">
                    <div class="card-header">
                        <h3 class="card-title">Nuevo Autor</h3>
                        <button data-dismiss="modal" aria-label="close" class="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="alert alert-danger text-center" id="noadd" style='display:none;'>
                            <span><i class="fas fa-times m-1"></i>El autor ya existe</span>
                        </div>
                        <div class="alert alert-success text-center" id="add" style='display:none;'>
                            <span><i class="fas fa-check m-1"></i>Se agrego correctamente</span>
                        </div>
                        <div class="alert alert-success text-center" id="edit" style='display:none;'>
                            <span><i class="fas fa-check m-1"></i>Se edito correctamente</span>
                        </div>

                        <form id="form-crear-autor">
                            <div class="form-group">
                                <label for="nombre">Nombre del Autor</label>
                                <input id="nombre" name="nombre" type="text" class="form-control" style="width: 100%;" placeholder="nombre del autor" required>
                            </div>                            
                            <input type="hidden" id="id_edit_autor">
                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn bg-gradient-primary float-right m-1">Guardar Autor</button>
                        <button type="button" data-dismiss="modal" class="btn btn-outline-secondary float-right m-1" >Cerrar</button>
                    </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
    
    <?php
    include_once('layouts/footer.php');
    ?>
<?php } else {
    header('Location: ../index.php');
}
?>
<script src="../js/Autor.js"></script>
<script src="../js/select2.js"></script>