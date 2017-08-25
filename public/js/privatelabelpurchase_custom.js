$(document).ready(() => {

  jQuery("#private-label-purchase-table").jqGrid({
   	url:'/api/purchase/data/get',
	datatype: "json",
   	colNames:['ID','Search Term', 'Quantity', 'Unit Cost', 'Shipping Location', 'Product Category', 'Product Dimension/Weight', 'Case Dimension/Weight', 'Case Pack', 'China Port / Shipping Terms', 'Amazon Label/UPC', 'HS Code', 'Purchase Date', 'Estimated Shipping Ready Date', 'Product Leed Time', 'Action'],
   	colModel:[
   		{name:'id',index:'id', width:40, align:"center"},
   		{name:'searchTerm',index:'searchTerm', width:50, align:"center", editable:true, editoptions: { dataEvents: [{ type: 'keypress', fn: function(e) {changeVal()}}]} },
   		{name:'quantity',index:'quantity', width:60, align:"center", editable:true, editoptions: { dataEvents: [{ type: 'keypress', fn: function(e) {changeVal()}}]} },
   		{name:'unitCost',index:'unitCost', width:40, align:"center", editable:true, editoptions: { dataEvents: [{ type: 'keypress', fn: function(e) {changeVal()}}]} },
      {name:'shipping',index:'shipping', width:65, align:"center", editable:true, editoptions: { dataEvents: [{ type: 'keypress', fn: function(e) {changeVal()}}]} },
      {name:'category',index:'category', width:60, align:"center", editable:true, editoptions: { dataEvents: [{ type: 'keypress', fn: function(e) {changeVal()}}]} },
      {name:'productWeight',index:'productWeight', width:120, align:"center", editable:true, editoptions: { dataEvents: [{ type: 'keypress', fn: function(e) {changeVal()}}]} },
      {name:'caseWeight',index:'caseWeight', width:40, align:"center", editable:true, editoptions: { dataEvents: [{ type: 'keypress', fn: function(e) {changeVal()}}]} },
      {name:'casePack',index:'casePack', width:75, align:"center", editable:true, editoptions: { dataEvents: [{ type: 'keypress', fn: function(e) {changeVal()}}]} },
      {name:'shippingTerm',index:'shippingTerm', width:75, align:"center", editable:true, editoptions: { dataEvents: [{ type: 'keypress', fn: function(e) {changeVal()}}]} },
      {name:'label',index:'label', width:100, align:"center", editable:true, editoptions: { dataEvents: [{ type: 'keypress', fn: function(e) {changeVal()}}]} },
      {name:'hsCode',index:'hsCode', width:65, align:"center", editable:true, editoptions: { dataEvents: [{ type: 'keypress', fn: function(e) {changeVal()}}]} },
      {name:'purchaseDate',index:'purchaseDate', width:100, align:"center", editable:true, editoptions: { dataEvents: [{ type: 'keypress', fn: function(e) {changeVal()}}]} },
      {name:'shippingDate',index:'shippingDate', width:70, align:"center", editable:true, editoptions: { dataEvents: [{ type: 'keypress', fn: function(e) {changeVal()}}]} },
      {name:'leadTime',index:'leadTime', width:90, align:"center", editable:true, editoptions: { dataEvents: [{ type: 'keypress', fn: function(e) {changeVal()}}]} },
      {name:'act',index:'act', width:70, align:"center", sortable:false}
   	],
   	rowNum:10,
   	rowList:[10,20,30],
   	pager: '#pager',
   	sortname: 'id',
    viewrecords: true,
    sortorder: "desc",
    gridComplete: function(){
  		var ids = jQuery("#private-label-purchase-table").jqGrid('getDataIDs');
  		for(var i=0;i < ids.length;i++){
  			var cl = ids[i];
  			be = "<form class='form-inline'><input style='height:22px;width:40px;' class='edit-row show btn btn-primary btn-xs' type='button' value='Edit' onclick='editRow("+cl+")' />";
  			se = "<input style='height:22px;width:40px;' class='save-row hidden btn btn-primary btn-xs' type='button' value='Save' onclick='saveRow("+cl+")' />";
  			ce = "<input style='height:22px;width:40px;' class='back-row hidden btn btn-primary btn-xs' type='button' value='Back' onclick='backOnRow("+cl+")' /></form>";
  			jQuery("#private-label-purchase-table").jqGrid('setRowData',ids[i],{act:be+se+ce});
  		}
  	},
  	editurl: "/api/purchase/data/post",
    // caption:"Private Label Manufacturers"
    });
    jQuery("#private-label-purchase-table").jqGrid('navGrid','#pager',{edit:false,add:false,del:false});
    jQuery("#private-label-purchase-table").jqGrid('inlineNav',"#pager",{edit:false,add:true ,del:false});

});

function editRow(rowId) {
  $(".edit-row").removeClass("show");
  $(".edit-row").addClass("hidden");
  $(".save-row").removeClass("show");
  $(".save-row").addClass("hidden");
  $(".back-row").removeClass("hidden");
  $(".back-row").addClass("show");
  jQuery('#private-label-purchase-table').editRow(rowId);
};

function saveRow(rowId) {
  $(".edit-row").removeClass("hidden");
  $(".edit-row").addClass("show");
  $(".save-row").addClass("hidden");
  $(".save-row").removeClass("show");
  $(".back-row").addClass("hidden");
  $(".back-row").removeClass("show");
  jQuery('#private-label-purchase-table').saveRow(rowId);
};

function backOnRow(rowId) {
  $(".edit-row").removeClass("hidden");
  $(".edit-row").addClass("show");
  $(".save-row").addClass("hidden");
  $(".save-row").removeClass("show");
  $(".back-row").addClass("hidden");
  $(".back-row").removeClass("show");
  jQuery('#private-label-purchase-table').restoreRow(rowId);
};

function changeVal() {
  $(".edit-row").removeClass("show");
  $(".edit-row").addClass("hidden");
  $(".save-row").addClass("show");
  $(".save-row").removeClass("hidden");
  $(".back-row").addClass("hidden");
  $(".back-row").removeClass("show");
};
