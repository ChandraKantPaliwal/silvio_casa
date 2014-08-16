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
            var html_content="<div id='price-value-field' class='form-group'><label class='control-label col-md-3'>Fixed Price Value</label><div class='col-md-4'><input class='form-control' name='price_value'></div></div>";
            $('#price-value-field').html(html_content);
        }
        else{
            var html_content="<div id='price-value-field' class='form-group'><label class='control-label col-md-3'>Making Charges</label><div class='col-md-4'><input class='form-control' name='price_value'></div></div>";
            $('#price-value-field').html(html_content);
        }
    });
});

