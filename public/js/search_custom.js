$(document).ready(function() {

    var table = $('#search-term-table').DataTable( {
        scrollY       : 300,
        scrollX       : true,
        scrollCollapse: true,
        paging        : false,
        fixedColumns  : true,
        columnDefs    : [
          { "width": "100px", "targets": 0 },
          { "width": "30px", "targets": 1 },
          { "width": "30px", "targets": 2 },
          { "width": "30px", "targets": 3 },
          { "width": "30px", "targets": 4 },
          { "width": "30px", "targets": 5 },
          { "width": "30px", "targets": 6 },
          { "width": "30px", "targets": 7 },
          { "width": "30px", "targets": 8 },
          { "width": "30px", "targets": 9 },
          { "width": "30px", "targets": 10 },
          { "width": "30px", "targets": 11 },
          { "width": "30px", "targets": 12 },
          { "width": "30px", "targets": 13 },
          { "width": "30px", "targets": 14 },
          { "width": "110px", "targets": 15 }
        ]
    } );

    $('#addSearch').click(() => {
      var searchterm = $('#add-search-term').val();
      if (searchterm === "") {
        alert('Please enter search term to add.')
      }
      else {
        var requestData = {
          searchterm,
          ip_address : '127.0.0.1'
        };
        $.post("/api/search/insert", requestData, function (data) {
          if (data.code === "ER_DUP_ENTRY") {
            alert(`Search term "${searchterm}" already exist.`);
          }
          else if (data.searchterm) {
            alert(`Search Term "${data.searchterm}" is added.`);
          }
        });
      }
    });

} );
