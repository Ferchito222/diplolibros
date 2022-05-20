$(document).ready(function() {

    $('.select2').select2();
    // var funcion;
    var edit = false;    

    let funcion = "listar";
    
    let datatable= $('#tabla_cliente').DataTable({
        "order": [[0, "desc"]],
        "responsive": true,
        "ajax": {
            "url": "../controlador/ClienteController.php",
            "method": "POST",
            "data": { funcion: funcion }
        },
        "columns": [
            { "data": "id_cliente" },
            { "data": "nombre_cliente" },
            { "data": "email" },
            { "data": "celular" },
            {
                "defaultContent": `      
                                <button class="editarnom btn btn-success" type="button" data-toggle="modal" data-target="#crearcliente">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>                           
                                 <button class="borrar_nombre btn btn-danger" ><i class="fas fa-trash"></i></button>`
            }
        ],
        "language": es
    });

    $('#form-crear-cliente').submit(e => {
        let id = $('#id_edit_cliente').val();
        let nombre = $('#nombre').val();
        let email = $('#email').val();
        let celular = $('#celular').val();

            if (edit == false) {
                funcion = 'crear';
            } else {
                funcion = 'editar';
            }            

            $.post('../controlador/ClienteController.php', { funcion, id, nombre, email, celular }, (response) => {
                if (response == 'add') {
                    $('#add').hide('slow');
                    $('#add').show(1000);
                    $('#add').hide(2000);                    
                    $('#form-crear-cliente').trigger('reset');
                    $('#tabla_cliente').DataTable().ajax.reload();                    
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se realizo con exito!' ,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                if (response == 'noadd') {
                    $('#noadd').hide('slow');
                    $('#noadd').show(1000);
                    $('#noadd').hide(2000);
                    $('#form-crear-cliente').trigger('reset');
                    $('#tabla_cliente').DataTable().ajax.reload();
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Se rechazo!' ,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                if (response == 'edit') {
                    $('#edit').hide('slow');
                    $('#edit').show(1000);
                    $('#edit').hide(2000);
                    $('#form-crear-cliente').trigger('reset');
                    $('#tabla_cliente').DataTable().ajax.reload();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se realizo con exito!' ,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                edit == false;
            })
            e.preventDefault();
            $('#crearcliente').modal('hide');

    });

    $('#tabla_cliente').on('click', '.editarnom', function () {
        var datos = datatable.row($(this).parents()).data();

        let id = datos.id_cliente;
        let nombre = datos.nombre_cliente;
        let email = datos.email;
        let celular = datos.celular;
        
        $('#id_edit_cliente').val(id);  
        $('#nombre').val(nombre);
        $('#email').val(email);  
        $('#celular').val(celular);
        edit = true;
    });

    $('#tabla_cliente').on('click', '.borrar_nombre', function() {        
        var elemento = datatable.row($(this).parents()).data();
        funcion = "borrar";

        const id = elemento.id_cliente;
        const nombre =elemento.nombre_cliente;
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger mr-1'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: '¿Desea eliminar ' + nombre + '?',
            text: "No podras revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, elimina esto!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.post('../controlador/ClienteController.php', { id, funcion }, (response) => {
                    edit == false;
                    if (response == ('borrado')) {
                        swalWithBootstrapButtons.fire(
                            'Borrar!',
                            'El Nombre y la Marca ' + nombre + ' fue borrado',
                            'success'
                        )
                        $('#tabla_cliente').DataTable().ajax.reload();
                    } else {
                        swalWithBootstrapButtons.fire(
                            'No se pudo borrar!',
                            'El Nombre y la Marca ' + nombre + ' no fue borrado, se utiliza en detalles de Distribucion',
                            'error'
                        )
                    }
                })

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'El Nombre y la Marca ' + nombre + ' no fue borrado',
                    'error'
                )
            }
        })
    });

});

let es = {
    "processing": "Procesando...",
    "lengthMenu": "Mostrar _MENU_ registros",
    "zeroRecords": "No se encontraron resultados",
    "emptyTable": "Ningún dato disponible en esta tabla",
    "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "infoFiltered": "(filtrado de un total de _MAX_ registros)",
    "search": "Buscar:",
    "infoThousands": ",",
    "loadingRecords": "Cargando...",
    "paginate": {
        "first": "Primero",
        "last": "Último",
        "next": "Siguiente",
        "previous": "Anterior"
    },
    "aria": {
        "sortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sortDescending": ": Activar para ordenar la columna de manera descendente"
    },
    "buttons": {
        "copy": "Copiar",
        "colvis": "Visibilidad",
        "collection": "Colección",
        "colvisRestore": "Restaurar visibilidad",
        "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
        "copySuccess": {
            "1": "Copiada 1 fila al portapapeles",
            "_": "Copiadas %d fila al portapapeles"
        },
        "copyTitle": "Copiar al portapapeles",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Mostrar todas las filas",
            "1": "Mostrar 1 fila",
            "_": "Mostrar %d filas"
        },
        "pdf": "PDF",
        "print": "Imprimir"
    },
    "autoFill": {
        "cancel": "Cancelar",
        "fill": "Rellene todas las celdas con <i>%d<\/i>",
        "fillHorizontal": "Rellenar celdas horizontalmente",
        "fillVertical": "Rellenar celdas verticalmentemente"
    },
    "decimal": ",",
    "searchBuilder": {
        "add": "Añadir condición",
        "button": {
            "0": "Constructor de búsqueda",
            "_": "Constructor de búsqueda (%d)"
        },
        "clearAll": "Borrar todo",
        "condition": "Condición",
        "conditions": {
            "date": {
                "after": "Despues",
                "before": "Antes",
                "between": "Entre",
                "empty": "Vacío",
                "equals": "Igual a",
                "not": "No",
                "notBetween": "No entre",
                "notEmpty": "No Vacio"
            },
            "moment": {
                "after": "Despues",
                "before": "Antes",
                "between": "Entre",
                "empty": "Vacío",
                "equals": "Igual a",
                "not": "No",
                "notBetween": "No entre",
                "notEmpty": "No vacio"
            },
            "number": {
                "between": "Entre",
                "empty": "Vacio",
                "equals": "Igual a",
                "gt": "Mayor a",
                "gte": "Mayor o igual a",
                "lt": "Menor que",
                "lte": "Menor o igual que",
                "not": "No",
                "notBetween": "No entre",
                "notEmpty": "No vacío"
            },
            "string": {
                "contains": "Contiene",
                "empty": "Vacío",
                "endsWith": "Termina en",
                "equals": "Igual a",
                "not": "No",
                "notEmpty": "No Vacio",
                "startsWith": "Empieza con"
            }
        },
        "data": "Data",
        "deleteTitle": "Eliminar regla de filtrado",
        "leftTitle": "Criterios anulados",
        "logicAnd": "Y",
        "logicOr": "O",
        "rightTitle": "Criterios de sangría",
        "title": {
            "0": "Constructor de búsqueda",
            "_": "Constructor de búsqueda (%d)"
        },
        "value": "Valor"
    },
    "searchPanes": {
        "clearMessage": "Borrar todo",
        "collapse": {
            "0": "Paneles de búsqueda",
            "_": "Paneles de búsqueda (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Sin paneles de búsqueda",
        "loadMessage": "Cargando paneles de búsqueda",
        "title": "Filtros Activos - %d"
    },
    "select": {
        "1": "%d fila seleccionada",
        "_": "%d filas seleccionadas",
        "cells": {
            "1": "1 celda seleccionada",
            "_": "$d celdas seleccionadas"
        },
        "columns": {
            "1": "1 columna seleccionada",
            "_": "%d columnas seleccionadas"
        }
    },
    "thousands": "."
};