$(document).ready(() => {



  jQuery("#private-manufacturer-table").jqGrid({
   	url:'/api/manufacturer/data/get',
	datatype: "json",
   	colNames:['IDs','Manufacturer Name', 'Address', 'Website', 'Manufacturing Category', 'Port', 'Wire Information', 'Sales Contact Name', 'Sales Email Address', 'Manufacturing/Technical Contact Name', 'Manufacturing/Technical Contact Email', 'Action'],
   	colModel:[
   		{name:'id',index:'id', width:55, align:"center"},
   		{name:'name',index:'name', width:90, align:"center", editable:true, editoptions: { dataEvents: [{ type: 'keypress', fn: function(e) {changeVal()}}]} },
   		{name:'address',index:'address', width:100, align:"center", editable:true},
   		{name:'website',index:'website', width:80, align:"center", editable:true},
      {name:'category',index:'category', width:100, align:"center", editable:true},
      {name:'port',index:'port', width:100, align:"center", editable:true},
      {name:'information',index:'information', width:100, align:"center", editable:true},
      {name:'saleName',index:'saleName', width:100, align:"center", editable:true},
      {name:'saleEmail',index:'saleEmail', width:100, align:"center", editable:true},
      {name:'tech_name',index:'tech_name', width:100, align:"center", editable:true},
      {name:'tech_email',index:'tech_email', width:100, align:"center", editable:true},
      {name:'act',index:'act', width:70, align:"center", sortable:false}
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
  			be = "<form class='form-inline'><input style='height:22px;width:40px;' class='edit-row show btn btn-primary btn-xs' type='button' value='Edit' onclick='editRow("+cl+")' />";
  			se = "<input style='height:22px;width:40px;' class='save-row hidden btn btn-primary btn-xs' type='button' value='Save' onclick='saveRow("+cl+")' />";
  			ce = "<input style='height:22px;width:40px;' class='back-row hidden btn btn-primary btn-xs' type='button' value='Back' onclick='backOnRow("+cl+")' /></form>";
  			jQuery("#private-manufacturer-table").jqGrid('setRowData',ids[i],{act:be+se+ce});
  		}
  	},
  	editurl: "/api/manufacturer/data/post",
    caption:"Private Label Manufacturers"
    });
    jQuery("#private-manufacturer-table").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false});
    jQuery("#private-manufacturer-table").jqGrid('inlineNav',"#pager2",{edit:false,add:true ,del:false});

});

function editRow(rowId) {
  $(".edit-row").removeClass("show");
  $(".edit-row").addClass("hidden");
  $(".save-row").removeClass("show");
  $(".save-row").addClass("hidden");
  $(".back-row").removeClass("hidden");
  $(".back-row").addClass("show");
  jQuery('#private-manufacturer-table').editRow(rowId);
};

function saveRow(rowId) {
  $(".edit-row").removeClass("hidden");
  $(".edit-row").addClass("show");
  $(".save-row").addClass("hidden");
  $(".save-row").removeClass("show");
  $(".back-row").addClass("hidden");
  $(".back-row").removeClass("show");
  jQuery('#private-manufacturer-table').saveRow(rowId);
};

function backOnRow(rowId) {
  $(".edit-row").removeClass("hidden");
  $(".edit-row").addClass("show");
  $(".save-row").addClass("hidden");
  $(".save-row").removeClass("show");
  $(".back-row").addClass("hidden");
  $(".back-row").removeClass("show");
  jQuery('#private-manufacturer-table').restoreRow(rowId);
};

function changeVal() {
  $(".edit-row").removeClass("show");
  $(".edit-row").addClass("hidden");
  $(".save-row").addClass("show");
  $(".save-row").removeClass("hidden");
  $(".back-row").addClass("hidden");
  $(".back-row").removeClass("show");
};
