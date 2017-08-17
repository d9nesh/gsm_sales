$(document).ready(function() {
    var table = $('#example').DataTable( {
        scrollY       : 400,
        scrollX       : true,
        scrollCollapse: true,
        paging        : false,
        fixedColumns  : true,
        columnDefs    : [
          { "width": "100px", "targets": 0 },
          { "width": "100px", "targets": 1 },
          { "width": "100px", "targets": 2 },
          { "width": "100px", "targets": 3 },
          { "width": "100px", "targets": 4 },
          { "width": "100px", "targets": 5 },
          { "width": "100px", "targets": 6 },
          { "width": "150px", "targets": 7 },
          { "width": "100px", "targets": 8 },
          { "width": "100px", "targets": 9 },
          { "width": "100px", "targets": 10 },
          { "width": "100px", "targets": 11 },
          { "width": "100px", "targets": 12 },
          { "width": "100px", "targets": 13 },
          { "width": "100px", "targets": 14 }
        ]
    } );
} );
