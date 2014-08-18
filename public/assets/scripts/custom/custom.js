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
            number:true
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

