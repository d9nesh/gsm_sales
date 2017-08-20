$(document).ready(function() {

    var table = $('#example').DataTable( {
        scrollY       : 300,
        scrollX       : true,
        scrollCollapse: true,
        paging        : false,
        fixedColumns  : true,
        columnDefs    : [
          { "width": "100px", "targets": 0 },
          { "width": "50px", "targets": 1 },
          { "width": "50px", "targets": 2 },
          { "width": "60px", "targets": 3 },
          { "width": "75px", "targets": 4 },
          { "width": "50px", "targets": 5 },
          { "width": "75px", "targets": 6 },
          { "width": "85px", "targets": 7 },
          { "width": "50px", "targets": 8 },
          { "width": "50px", "targets": 9 },
          { "width": "50px", "targets": 10 },
          { "width": "50px", "targets": 11 },
          { "width": "90px", "targets": 12 },
          { "width": "50px", "targets": 13 },
          { "width": "50px", "targets": 14 },
          { "width": "110px", "targets": 15 }
        ]
    } );

    $('#addSearch').click(() => {
      var requestData = {
        searchterm : $('#add-search-term').val(),
        ip_address : '127.0.0.1'
      };
      $.post("/api/search/insert", requestData, function (data) {
        alert(`Search Term "${data.searchterm}" is added.`);
      });
    });

} );
