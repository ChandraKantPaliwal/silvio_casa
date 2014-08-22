$(document).ready(function(){
	$('.disable-notification').click(function(){
      var id=$(this).attr('item-id');
      $.get("/disableNotification/"+id, function(data) {
            if(data.success == "true"){
                bootbox.alert(data.message, function(){
                	window.location.replace("/");
                });
            } else {
                bootbox.alert(data.message);
            }
        });
      
    });
});