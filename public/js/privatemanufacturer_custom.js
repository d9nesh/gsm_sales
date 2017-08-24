$(document).ready(() => {

  jQuery("#private-manufacturer-table").jqGrid({
   	url:'/api/manufacturer/data',
	datatype: "json",
   	colNames:['IDs','Manufacturer Name', 'Address', 'Website', 'Manufacturing Category', 'Port', 'Wire Information', 'Sales Contact Name', 'Sales Email Address', 'Manufacturing/Technical Contact Name', 'Manufacturing/Technical Contact Email', 'Action'],
   	colModel:[
   		{name:'id',index:'id', width:55},
   		{name:'name',index:'name', width:90, align:"center", editable:true},
   		{name:'address',index:'address', width:100, editable:true},
   		{name:'website',index:'website', width:80, align:"center", editable:true},
      {name:'category',index:'category', width:100, editable:true},
      {name:'port',index:'port', width:100, editable:true},
      {name:'information',index:'information', width:100, editable:true},
      {name:'saleName',index:'saleName', width:100, editable:true},
      {name:'saleEmail',index:'saleEmail', width:100, editable:true},
      {name:'tech_name',index:'tech_name', width:100, editable:true},
      {name:'tech_email',index:'tech_email', width:100, editable:true},
      {name:'act',index:'act', width:75,sortable:false}
   	],
   	rowNum:10,
   	rowList:[10,20,30],
   	pager: '#pager2',
   	sortname: 'id',
    viewrecords: true,
    sortorder: "desc",
    gridComplete: function(){
  		var ids = jQuery("#private-manufacturer-table").jqGrid('getDataIDs');
  		for(var i=0;i < ids.length;i++){
  			var cl = ids[i];
  			be = "<input style='height:22px;width:20px;' type='button' value='E' onclick=\"jQuery('#private-manufacturer-table').editRow('"+cl+"');\"  />";
  			se = "<input style='height:22px;width:20px;' type='button' value='S' onclick=\"jQuery('#private-manufacturer-table').saveRow('"+cl+"');\"  />";
  			ce = "<input style='height:22px;width:20px;' type='button' value='C' onclick=\"jQuery('#private-manufacturer-table').restoreRow('"+cl+"');\" />";
  			jQuery("#private-manufacturer-table").jqGrid('setRowData',ids[i],{act:be+se+ce});
  		}
  	},
  	// editurl: "/api/manufacturer/data",
    caption:"Private Label Manufacturers"
    });
    jQuery("#private-manufacturer-table").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false});

});
