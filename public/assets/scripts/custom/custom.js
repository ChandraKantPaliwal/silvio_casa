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

function typeaheadTest(){
    $('.item-code').typeahead({
        source: ['Toronto','Montreal','New York','Buffalo','Boston','Columbus','Dallas','Vancouver','Seattle', 'Los Angeles'
        ]
    });
}
function selectedValue(){
    $('.item-code').keyup(function(e){
        if(e.keyCode==13){
          bootbox.alert($(this).val());
        }
    });
}
// function typeaheadTest(){
//     $('.item-code').typeahead({
//         source: ['Toronto','Montreal','New York','Buffalo','Boston','Columbus','Dallas','Vancouver','Seattle', 'Los Angeles'
//         ]
//     });
// }

// $.getJSON('/item/'+query, function(data,success) {
//                 process(data);
//             });

// function typeaheadIntialize(){
//     $('.item-code').typeahead({
//         source: function (query, process) {
//             $.getJSON('/item/'+query, function(data,success) {
//                 process(data);
//             });
//         }    
//     });

//     $(".prevent-enter").keypress(function(e){
//         if(e.keyCode==13)
//             e.preventDefault(); 
//     });    

//    $(".item-code").keyup(function(e){
//         if(e.keyCode == 13)
//         {
//             var dom = $(this);
//             var codeValue=$(this).val();
//             $.get('itemDetail/:'+codeValue, function(data,success) {

//                 if(data[0].quantity==0)
//                 {
//                     bootbox.alert("Quantity not available");
//                     return;
//                 }
//                 dom.parent().parent().find('.item-name').val(data[0].name);
//                 dom.parent().parent().find('.item-weight').val(data[0].weight);
//                 dom.parent().parent().find('.hidden_single_weight').val(data[0].weight);
//                 dom.parent().parent().find('.item-price').val(data[0].price);
//                 dom.parent().parent().find('.hidden_original_price').val(data[0].price);
//                 dom.parent().parent().find('.item-quantity').val(1);
//                 // calculation();
//             });
//         }
//    });

//    $(".item-quantity").keyup(function(e){
        
//             // var dom = $(this);
//             // var quantity_value=0;

//             // if(dom.val()!='')
//             //     quantity_value=$(this).val();
//             // else
//             //     return;

//             // if(quantity_value<1)
//             // {
//             //     $(this).val(1);
//             //     return;
//             // }
//             // var item_code =dom.parent().parent().find('.item-code').val();

//             // dom.parent().parent().find('.item-weight').val(quantity_value*dom.parent().parent().find('.hidden_single_weight').val());
//             //// DemandQty:quantity_value
//             // $.getJSON("itemDetail/"+item_code},function(data,status){
//             //     if(data.status!='avail')    
//             //     {
//             //         $.gritter.add({
//             //             title: 'Information!',
//             //             text: 'Quantity exceeds avialable quantity',
//             //             image: './assets/img/sign-error-icon.png',
//             //             sticky: false,
//             //             time: '2000',
//             //             class_name: 'my-sticky-class'
//             //         });
//             //         dom.val(data.quantity);
//             //     }
//             //     else
//             //     {
//             //         var price_value =dom.parent().parent().find('.hidden_original_price').val();
//             //         dom.parent().parent().find('.item-price').val(parseFloat(price_value*quantity_value));
//             //         var final_bill_price=0;
//             //         $(".item-price").each(function(i,data){
//             //             if($(this).val()!='')
//             //                 final_bill_price+=parseFloat($(this).val());
//             //         }); 
//             //         calculation();
//             //     }
//             // });
//    });
// }


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

