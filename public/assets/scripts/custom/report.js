$("#bnt_get_reports").click(function(){
	$.post('/reports',{dateStart:$("#date_from").val(),dateEnd:$("#date_to").val()},function(data,status){
		$("#custom_report_container").html(data);
	});
});