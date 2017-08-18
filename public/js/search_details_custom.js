$(document).ready(function() {
    var table = $('#word-scores').DataTable( {
        scrollY       : 250,
        scrollX       : true,
        scrollCollapse: true,
        paging        : false,
        searching     : false,
    } );
} );

$(document).ready(function() {
    var table = $('#asin-details').DataTable( {
        scrollY       : 250,
        scrollX       : true,
        scrollCollapse: true,
        paging        : false,
        searching     : false,
        fixedColumns  : true,
        order         : [[ 0, "desc" ]],
        columnDefs    : [
          { "width": "50px", "targets": 0 },
          { "width": "40px", "targets": 1 },
          { "width": "35px", "targets": 2 },
          { "width": "50px", "targets": 3 },
          { "width": "50px", "targets": 4 },
          { "width": "50px", "targets": 5 },
          { "width": "50px", "targets": 6 },
          { "width": "125px", "targets": 7 },
          { "width": "130px", "targets": 8 },
          { "width": "50px", "targets": 9 }
        ]
    } );
} );