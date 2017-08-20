$(document).ready(function() {

    var table = $('#word-scores').DataTable( {
        scrollY       : 250,
        scrollX       : true,
        scrollCollapse: true,
        paging        : false,
        searching     : false,
    } );

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
          { "width": "20px", "targets": 1 },
          { "width": "20px", "targets": 2 },
          { "width": "20px", "targets": 3 },
          { "width": "20px", "targets": 4 },
          { "width": "20px", "targets": 5 },
          { "width": "20px", "targets": 6 },
          { "width": "100px", "targets": 7 },
          { "width": "110px", "targets": 8 },
          { "width": "20px", "targets": 9 }
        ]
    } );

    $(".listing-detail").on('click',function(){
		 var currentRow=$(this).closest("tr");
		 var col1=currentRow.find(".asin-label-text").html();
     $("#asin-detail-label").text(col1);
		 $('#listing-table').DataTable();
	});

} );
