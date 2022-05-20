$(document).ready(function () {

    $('.select2').select2();
    let funcion;
    let funcion2 = "listar";

    var edit = false;
        
    rellenar_Autor();

    let datatable= $('#tabla_libro22').DataTable({
        "order": [[0, "desc"]],
        "responsive": true,
        "ajax": {
            "url": "../controlador/LibroController.php",
            "method": "POST",
            "data": { funcion2: funcion2 }
        },
        
        "columns": [
            { "data": "id_libro" },
            { "data": "titulo" },
            { "data": "nombreautor" },
            { "data": "lote" },
            { "data": "descripcion" },
            {
                "defaultContent": `      
                                <button class="editarnom btn btn-success" type="button" data-toggle="modal" data-target="#crearlibro">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>                           
                                 <button class="borrar_nombre btn btn-danger" ><i class="fas fa-trash"></i></button>`
            }
        ],
        "language": espp
    });
    // console.log(datatable);
    function rellenar_Autor() {
        funcion = "rellenar_autores";
        $.post('../controlador/AutorController.php', { funcion }, (response) => {
            const nombres = JSON.parse(response);
            let template = '<option value ="" selected>Seleccionar Autor</option>';
            nombres.forEach(nombre_prod => {
                template += `
                    <option value="${nombre_prod.id}">${nombre_prod.nombre}</option>
                `;
            });
            $('#autores').html(template);
        })
    }

    $('#form-crear-libro').submit(e => {
        let id = $('#id_edit_libro').val();
        let titulo = $('#titulo').val();
        let autores = $('#autores').val();
        let lote = $('#lote').val();
        let des = $('#des').val();
        // console.log(id,titulo,autores,lote,des);
        if (edit == false) {
            funcion = 'crear';
        } else {
            funcion = 'editar';
        }

        $.post('../controlador/LibroController.php', { funcion, id, titulo, autores, lote, des }, (response) => {
            if (response == 'add') {
                $('#add').hide('slow');
                $('#add').show(1000);
                $('#add').hide(2000);
                $('#form-crear-libro').trigger('reset');
                $('#tabla_libro22').DataTable().ajax.reload();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se realizo con exito!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            if (response == 'noadd') {
                $('#noadd').hide('slow');
                $('#noadd').show(1000);
                $('#noadd').hide(2000);
                $('#form-crear-libro').trigger('reset');
                $('#tabla_libro22').DataTable().ajax.reload();
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Se rechazo!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            if (response == 'edit') {
                $('#edit').hide('slow');
                $('#edit').show(1000);
                $('#edit').hide(2000);
                $('#form-crear-libro').trigger('reset');
                $('#tabla_libro22').DataTable().ajax.reload();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se realizo con exito!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            edit == false;
        })
        e.preventDefault();
        $('#crearlibro').modal('hide');

    });

    $('#tabla_libro22').on('click', '.editarnom', function () {
        var datos = datatable.row($(this).parents()).data();
        console.log(datos);
        let id = datos.id_libro;
        let titulo = datos.titulo;
        let lote = datos.lote;
        let des= datos.descripcion;
        let id_au = datos.id_autor;

        $('#id_edit_libro').val(id);
        $('#titulo').val(titulo);
        $('#autores').val(id_au).trigger('change');
        $('#lote').val(lote);
        $('#des').val(des);
        edit = true;
    });

    $('#tabla_libro22').on('click', '.borrar_nombre', function () {
        var elemento = datatable.row($(this).parents()).data();
        funcion = "borrar";
        // console.log(elemento);
        const id = elemento.id_libro;
        const nombre = elemento.titulo;
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
                $.post('../controlador/LibroController.php', { id, funcion }, (response) => {
                    edit == false;
                    if (response == ('borrado')) {
                        swalWithBootstrapButtons.fire(
                            'Borrar!',
                            'El Nombre y la Marca ' + nombre + ' fue borrado',
                            'success'
                        )
                        $('#tabla_libro22').DataTable().ajax.reload();
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

let espp = {
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