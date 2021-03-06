$(document).ready(function() {


// DataTable Initialization function
  $('#example').DataTable( {
      // "searching": false,
      "scrollY"  : "300px",
      "scrollCollapse": true,
      "paging": false,
      initComplete: function () {
          this.api().columns([1]).every( function () {
              var column = this;
              var select = $('<select id ="business-segment" style="display: none;"><option value="">Amazon</option></select>')
                  .appendTo( $(column.header()) )
                  .on( 'change', function () {
                      var val = $.fn.dataTable.util.escapeRegex(
                          $(this).val()
                      );

                      column
                          .search( val ? '^'+val+'$' : '', true, false )
                          .draw();
                  } );

              column.data().unique().sort().each( function ( d, j ) {
                  select.append( '<option value="'+d+'">'+d+'</option>' )
              });
          });
        }
  });


// Change Business Segment Value function
  $("#segment").change(function(){
  var segmentValue = jQuery( "#segment").val();
    console.log("Selected value: " + segmentValue);
    if(segmentValue == "Amazon"){
      segmentValue = "";
    }
    jQuery( "#business-segment" ).val(segmentValue).change();
  });


// Check/Uncheck all Checkbox function
  jQuery("#check").click(function() {
    if (this.checked == true) {
      $("input[name='asin[]']").prop("checked", true);
    }
    else {
        $("input[name='asin[]']").prop("checked", false);
    }
  });


//  Submit all checked checkbox values function
  $('#submit-form').click(function functionName() {
    var values = $('.product_asin_check:checked').map(function(_, el) {
          return $(el).val();
      }).get();
    $('.asin-values').val(values);
  });


});

// Daily Chart
$(document).ready(function() {

  $('#genrate-chart').click(function () {
      var asinValue = $('#asin').val();
      var days = $('#chart').val();
      var values = $('.product_asin_check:checked').map(function(_, el) {
                    return $(el).val();
                  }).get();
      var requestData;
      if (asinValue !== "") {
        requestData = {
          asin: asinValue,
          chart_day: days
        };
      }
      else {
        requestData = {
          asin: values,
          chart_day: days
        };
      }

      jQuery("#ajax_loader").show();
      $("#chartContainer1").hide();
      $("#profitchartContainer").hide();

      $.ajax({
          dataType: "json",
          url: "/api/chartdata",
          type : 'get',
          // data: {asin:"B01F1CP0DS,B01MT8HASA", chart_day:5},
          data : requestData,
          contentType : 'application/json',
          success: function (data) {
              jQuery("#ajax_loader").hide();
              $("#chartContainer1").show();
              $("#profitchartContainer").show();

              var data = data.data;
              var chartData =[];
              var profitData = [];
              var profitdateExist = [];
              var profitdatapoints = [];
              var dateExist = [];
              var datapoints = [];
              var temp = 0;

                for (var i = 0; i < data.length; i++) {
                  sale_date = data[i].sale_date;
                  if (dateExist[sale_date] != undefined){
                      count = dateExist[sale_date];
                      var pointupdate = true;
                      var saleQuantity = 0;
                      var profitQuantity = 0;
                      var profitdata = 0;
                      var data_x_points = data[i].sale_hour + "." + data[i].sale_minutes;
                      console.log("data x points: " + data_x_points);

                      var datalength = datapoints[sale_date].length;
                      if(datalength != undefined){
                        datalength = datalength - 1;
                        saleQuantity = parseInt(datapoints[sale_date][datalength].y);
                        profitQuantity = parseInt(profitdatapoints[sale_date][datalength].y);
                      }

                      for (var point=0 ; point < datapoints[sale_date].length; point++){
                          if(datapoints[sale_date][point].x == data_x_points){
                            console.log("Data points x: " + datapoints[sale_date][point].x + " = " + data[i].sale_hour);
                                pointupdate = false;
                                datapoints[sale_date][point].y = saleQuantity + parseInt(data[i].quantity);
                                profitdatapoints[sale_date][point].y = profitQuantity + parseInt(data[i].profit);
                                profitdata = profitQuantity + parseInt(data[i].profit);
                          }
                      }

                      if(pointupdate){
                            profitdata = parseInt(data[i].profit) + profitQuantity;

                            datapoints[sale_date].push({
                                x:parseFloat(data_x_points),
                                y:parseFloat(data[i].quantity) + parseInt(saleQuantity)
                            });

                            profitdatapoints[sale_date].push({
                                x:parseFloat(data_x_points),
                                y:parseFloat(data[i].profit) + profitQuantity
                            });
                      }

                      chartData[count] = {
                          type: "line",
                          markerType: "none",
                          showInLegend: true,
                          legendText: data[i].printDate,
                          dataPoints : datapoints[sale_date]
                      }

                      profitData[count] = {
                          type: "line",
                          markerType: "none",
                          showInLegend: true,
                          legendText: data[i].printDate,
                          dataPoints : profitdatapoints[sale_date]
                      }
                  }else{

                      dateExist[sale_date] = temp;
                      datapoints[sale_date] = [];
                      data_x_points = data[i].sale_hour + "." + data[i].sale_minutes;

                      console.log("data x points: " + data_x_points);
                      datapoints[sale_date].push({
                          x:parseFloat(data_x_points),
                          y:data[i].quantity
                      });

                      profitdatapoints[sale_date] = [];
                      profitdatapoints[sale_date].push({
                          x:parseFloat(data_x_points),
                          y:data[i].profit
                      });

                      chartData[temp] = {
                          type: "line",
                          markerType: "none",
                          showInLegend: true,
                          legendText: data[i].printDate,
                          dataPoints : [{
                              x:parseFloat(data_x_points),
                              y:data[i].quantity
                          }]
                      }

                      profitData[temp] = {
                          type: "line",
                          markerType: "none",
                          showInLegend: true,
                          legendText: data[i].printDate,
                          dataPoints : [{
                              x:parseFloat(data_x_points),
                              y:data[i].profit
                          }]
                      }

                      temp = temp + 1;
                  }
                }

                //Better to construct options first and then pass it as a parameter
                var options1 = {
                    title: {
                        text: "GSM : Daily Chart Sales"
                    },
                    animationEnabled: true,
                    axisY:{
                        title: "sales"
                    },
                    axisX:{
                        title: "time",
                        gridThickness: 1,
                        interval: 6,
                        labelAngle: 0,
                        minimum: 0,
                        maximum: 24
                    },
                    data: chartData,
                };

                var profitOptions = {
                    title: {
                        text: "GSM : Daily Chart Profit"
                    },
                    animationEnabled: true,
                    axisY:{
                        title: "profit"
                    },
                    axisX:{
                        title: "time",
                        gridThickness: 1,
                        interval: 6,
                        labelAngle: 0,
                        minimum: 0,
                        maximum: 24
                    },
                    data: profitData,
                };
                $("#chartContainer1").CanvasJSChart(options1);
                $('#profitchartContainer').CanvasJSChart(profitOptions);
          }
      });
  });
});
