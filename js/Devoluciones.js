$(document).ready(function () {

    let funcion, funcion1, funcion2;

    funcion2 = "listar";

    // rellenar_cliente();
    // ordenar();
    let datatable = $('#tabla_devoluciones').DataTable({
        "lengthMenu": [[4, 10, 25, -1], [3, 10, 25, "All"]],
        "ajax": {
            "url": "../controlador/PrestamoController.php",
            "method": "POST",
            "data": { funcion2: funcion2 }
        },        
        "columns": [
            { "data": "titulo" },
            { "data": "cliente" },
            {
                "defaultContent": `
                    <button class="ver btn btn-success" type="button" data-toggle="modal" data-target="#vista_lista" ><i class="fas fa-money-check"></i></button>
                    <button class="devolver btn btn-primary" type="button"><i class="fas fa-hand-holding-usd"></i></button>
                ` }
        ],
        "language": dishj
    });
    $('#tabla_devoluciones').on('click', '.ver', function() {
        let datos = datatable.row($(this).parents()).data();

        $('#titulo').html(datos.titulo);
        $('#cliente').html(datos.cliente);
        $('#fecha').html(datos.fecha_prestamo);
        $('#dias').html(datos.dias_prestamos);                    
    });

    //PARA BORRAR EL PRODUCTO DE LA TABLA DE LISTA_DIS 
    $('#tabla_devoluciones').on('click', '.devolver', function() {        
        var elemento = datatable.row($(this).parents()).data();
        let id = elemento.id_prestamo;
        let id_libro = elemento.id_lib;
        let nombre = elemento.titulo;
        // console.log(id,id_lib,nombre);
        funcion = "borrar";
        // funcion2 = "devolver";
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger mr-1'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: '¿Desea devolver este libro ' + nombre + '?',
            text: "No podras revertir esto!",
            showCancelButton: true,
            confirmButtonText: 'Si, devolver!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                
                $.post('../controlador/PrestamoController.php', { id, id_libro, funcion }, (response) => {
                    if (response == ('borrado')) {
                        swalWithBootstrapButtons.fire(
                            'Devuelto!',
                            'El libro' + nombre + ' fue devuelto',
                            'success'
                        )
                        $('#tabla_devoluciones').DataTable().ajax.reload();
                        $('#tabla_prestamos').DataTable().ajax.reload();
                    } else {
                        swalWithBootstrapButtons.fire(
                            'No se pudo devolver!',
                            'El libro' + nombre + ' no fue devuelto',
                            'error'
                        )
                    }
                })

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'El libro ' + nombre + ' no fue devuelto',
                    'error'
                )
            }
        })
        // $('#tabla_lista').DataTable().ajax.reload();
    });    

//RECUPERAR LOS PRODUCTOS
function RecuperarLS() {
    let productos;
    if (localStorage.getItem('lista_dis') === null) {
        productos = [];
    } else {
        productos = JSON.parse(localStorage.getItem('lista_dis'));
    }
    return productos;
}

//AGREGARPRODUCTOS
function AgregarLS(producto) {
    let productos;
    productos = RecuperarLS();
    productos.push(producto);
    localStorage.setItem('lista_dis', JSON.stringify(productos));
}

//ELIMINAR EL LOCAL STORE
function eliminarLS() {
    localStorage.removeItem('lista_dis');
    // localStorage.clear();
}


});


let dishj = {
    "processing": "Procesando...",
    "lengthMenu": "Mostrar _MENU_ registros",
    "zeroRecords": "No se encontraron resultados",
    "emptyTable": "Ningún dato disponible en esta tabla",
    "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "infoFiltered": "(filtrado de un total de _MAX_ registros)",
    "search": "Buscar:",
    "infoThousands": ",",
    "loadingRecords": "Tabla vacia",
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