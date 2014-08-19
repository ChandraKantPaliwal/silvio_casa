/**
Custom module for you to write your own javascript functions
**/
var Custom = function () {

    // private functions & variables

    var myFunc = function(text) {
        alert(text);
    }

    // public functions
    return {

        //main function
        init: function () {
            TableAdvanced.init();
            //initialize here something.            
        },

        //some helper function
        doSomeStuff: function () {
            myFunc();
        }

    };

}();

/***
Usage
***/
//Custom.init();
//Custom.doSomeStuff();


// for the price type add remove fields
$(document).ready(function(){
    $(".price-type").click(function(){
        if($(this).val()=='yes'){
            var html_content="<label class='control-label col-md-3'>Fixed Price Value</label><div class='col-md-4'><input class='form-control price_value' name='price_value'></div>";
            $('#price-value-field').html(html_content);
        }
        else{
            var html_content="<label class='control-label col-md-3'>Making Charges</label><div class='col-md-4'><input class='form-control price_value' name='price_value'></div>";
            $('#price-value-field').html(html_content);
        }
    });
});

    var $validate = $("#add-item").validate({
      rules: {
        name: {
            required:true,
        },
        code: {
            required:true,
        },
        item_type: {
            required:true,
        },
        weight: {
            required:true,
            number:true
        },
        quantity: {
            required:true,
            digits:true
        },
        price_value:{
            number:true
        }
      },
      messages: {
        name: "Please Name of Item",
        code: "Please Code of Item",
        item_type: "Please Type of Item",
        weight: {
            required: "Please Weight of Item",
            digits: "Please Enter Numeric value"
        },
        quantity: {
            required: "Please Quantity of Item",
            digits: "Please Enter Numeric value"
        },
        price_value: "Please Enter Numeric value"
      }
    });

$(document).ready(function(){
    $('#save-item').click(function(){
        $('#save-item').html("validating...").fadeIn();
            $('#add-item').submit();
            $('#save-item').html("Submit");
    });
});

function intialize()
{
    $('.item-code').typeahead({
        source: function (query, process) {
            $.getJSON('jquery-type-ahead.php',{one:1,codeValue:query},function(data,success) {
                process(data);
            });
        }    
    });

    $(".prevent-enter").keypress(function(e){
        if(e.keyCode==13)
            e.preventDefault(); 
    });    

   $(".item-code").keyup(function(e){
        if(e.keyCode == 13)
        {
            var dom = $(this);
            var code_value=$(this).val();
            $.getJSON('jquery_ajax.php',{getItemData:code_value},function(data,success) {

                if(data.quantity==0)
                {
                    $.gritter.add({
                        title: 'Information!',
                        text: 'Available Quantity is 0.',
                        image: './assets/img/sign-error-icon.png',
                        sticky: false,
                        time: '2000',
                        class_name: 'my-sticky-class'
                    });
                    return;
                }
                dom.parent().parent().find('.item-name').val(data.name);
                dom.parent().parent().find('.item-weight').val(data.weight);
                dom.parent().parent().find('.hidden_single_weight').val(data.weight);
                dom.parent().parent().find('.item-price').val(data.price);
                dom.parent().parent().find('.hidden_original_price').val(data.price);
                dom.parent().parent().find('.item-quantity').val(1);
                // var final_bill_price=0;

                // $(".item-price").each(function(i,data){
                //  if($(this).val()!='')
                //      final_bill_price+=parseFloat($(this).val());
                // });  

                // $(".total_bill_price").val(final_bill_price);
                // $(".total_payable_amount").val(final_bill_price);
                // $(".amount").val(final_bill_price);
                // $(".discount").val(0);
                // $(".vat").val(0);
                // $(".advance").val(0);
                // $(".total-payable-amount").val(0);
                calculation();
            });
        }
   });

   $(".item-quantity").keyup(function(e){
        
            var dom = $(this);
            var quantity_value=0;

            if(dom.val()!='')
                quantity_value=$(this).val();
            else
                return;

            if(quantity_value<1)
            {
                $(this).val(1);
                return;
            }
            var item_code =dom.parent().parent().find('.item-code').val();

            dom.parent().parent().find('.item-weight').val(quantity_value*dom.parent().parent().find('.hidden_single_weight').val());

            $.getJSON("jquery-qty-check.php",{ItemsExists:item_code,DemandQty:quantity_value},function(data,status){
                if(data.status!='avail')    
                {
                    $.gritter.add({
                        title: 'Information!',
                        text: 'Quantity exceeds avialable quantity',
                        image: './assets/img/sign-error-icon.png',
                        sticky: false,
                        time: '2000',
                        class_name: 'my-sticky-class'
                    });
                    dom.val(data.quantity);
                }
                else
                {
                    var price_value =dom.parent().parent().find('.hidden_original_price').val();
                    dom.parent().parent().find('.item-price').val(parseFloat(price_value*quantity_value));
                    var final_bill_price=0;
                    $(".item-price").each(function(i,data){
                        if($(this).val()!='')
                            final_bill_price+=parseFloat($(this).val());
                    }); 
                    calculation();
                }
            });
   });
}

function loadTable(id){
    var oTable = $('#'+id).dataTable( {           
            "aoColumnDefs": [
                { "aTargets": [ 0 ] }
            ],
            "aaSorting": [[1, 'asc']],
             "aLengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 10,
        });

        jQuery('#sample_2_wrapper .dataTables_filter input').addClass("form-control input-small input-inline"); // modify table search input
        jQuery('#sample_2_wrapper .dataTables_length select').addClass("form-control input-small"); // modify table per page dropdown
        jQuery('#sample_2_wrapper .dataTables_length select').select2(); // initialize select2 dropdown

        $('#sample_2_column_toggler input[type="checkbox"]').change(function(){
            /* Get the DataTables object again - this is not a recreation, just a get of the object */
            var iCol = parseInt($(this).attr("data-column"));
            var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
            oTable.fnSetColumnVis(iCol, (bVis ? false : true));
        });
    }

