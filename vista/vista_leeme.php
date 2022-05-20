<?php
session_start();
if ($_SESSION['us_tipo'] == 1) {
    include_once('layouts/header.php');
?>

    <title>Adm | LEEME</title>
    <link rel="shortcut icon" type="image/x-icon" href="../img/favicon.ico" />
    <!-- Tell the browser to be responsive to screen width -->
    <?php
    include_once('layouts/nav.php');
    ?>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <h1>
        <p>Saludos...</p>
        <p>No tengo mucho conocimiento en Vue.js y laravel que no pude concluir el examen</p>
        <p>De todas maneras termine haciendolo en php(puro) interfaz modelo-vista-controlador</p>
        <p> pero se que no sere elegido mas bien agradecer por la oportunidad, ya despues volvere a intentar.</p></h1>
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