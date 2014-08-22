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
                required:true,
                number:true
            }
        },
        messages: {
            name: "Please Enter Name of Item",
            code: "Please Enter Code of Item",
            item_type: "Please Select Type of Item",
            weight: {
                required: "Please Enter Weight of Item",
                digits: "Please Enter Numeric value"
            },
            quantity: {
                required: "Please Enter Quantity of Item",
                digits: "Please Enter Numeric value"
            },
            price_value: {
                required: "Please Enter Price Value of Item",
                digits: "Please Enter Numeric value"
            }
        },
        submitHandler: function(form) {
            var val=$('#add-item').serialize();
                $.post("/item",val, function(data) {
                    if(data.success == "true"){
                        $("#save-item").html("Item Saved");
                        bootbox.alert(data.message, function(){
                            window.location.replace("/item");
                        });
                    } else {
                        bootbox.alert(data.message);
                        $("#save-item").html("Save Item");
                    }
                });
        }
    });

$(document).ready(function(){
    $('#save-item').click(function(){
        $('#save-item').html("validating...").fadeIn('slow');
            $('#add-item').submit();
            
            $('#save-item').html("Submit");
    });
});

function typeaheadTest(){
    $('.item-code').typeahead({
        source: function (query, process) {
            $.getJSON('/item/'+query, function(data,success) {
                process(data.items);
            });
        }
    });

    selectedValue();
    validateQuantity();
}

function selectedValue(){
    $('.item-code').blur(function(){
        var dom = $(this);
        if($(this).val()==""){
            dom.parent().parent().find('.item-name').val("");
            dom.parent().parent().find('.item-weight').val("");
            dom.parent().parent().find('.actual-weight').val("");
            dom.parent().parent().find('.item-price').val("");
            dom.parent().parent().find('.actual-price').val("");
            dom.parent().parent().find('.item-quantity').val("");
            dom.parent().parent().find('.available-quantity').val("");
        }
        else{
            $.getJSON('/itemDetails/'+$(this).val(), function(data,success) {
                if(data.success){
                    if(data.items[0].quantity==0)
                    {
                        bootbox.alert("Quantity not available");
                        return;
                    }
                    dom.parent().find('.ids').val(data.items[0].id);
                    dom.parent().parent().find('.item-name').val(data.items[0].name);
                    dom.parent().parent().find('.item-weight').val(data.items[0].weight);
                    dom.parent().parent().find('.actual-weight').val(data.items[0].weight);
                    var price=0;
                    var total_price=0;
                    if(data.items[0].making_charges>0){
                        total_price=data.items[0].making_charges*data.items[0].weight*1;
                        price=data.items[0].making_charges;
                        dom.parent().parent().find('.actual-price').attr("making_charges", "yes");
                    }
                    else{
                        dom.parent().parent().find('.actual-price').attr("making_charges", "no");
                        total_price=data.items[0].fixed_price*1;
                        price=data.items[0].fixed_price;
                    }
                    dom.parent().parent().find('.item-price').val(total_price);
                    dom.parent().parent().find('.actual-price').val(price);
                    // dom.parent().parent().find('.hidden_original_price').val(data.items[0].price);
                    dom.parent().parent().find('.item-quantity').val(1);
                    dom.parent().parent().find('.available-quantity').val(data.items[0].quantity);
                    calculate_total_price();
                }
                else{
                    bootbox.alert("Quantity not available");
                }
            });
        }
    });
}

function validateQuantity(){
    $('.item-quantity').blur(function(){;
        if(parseFloat($(this).parent().find('.available-quantity').val())<parseFloat($(this).val())){
            bootbox.alert("Quantity Not available in Stock");
            $(this).val(1);
        }
        else{
            if($(this).parent().parent().find('.actual-price').attr('making_charges')=="yes"){
                console.log("making charges yes");
                var price=$(this).parent().parent().find('.actual-price').val();
                var weight=$(this).parent().parent().find('.actual-weight').val();
                $(this).parent().parent().find('.item-weight').val(parseFloat($(this).val())*parseFloat(weight));
                var total_price=parseFloat(price)*parseFloat(weight)*parseFloat($(this).val());
                $(this).parent().parent().find('.item-price').val(total_price);
                calculate_total_price();
            }
            else{
                var weight=$(this).parent().parent().find('.actual-weight').val();
                $(this).parent().parent().find('.item-weight').val(parseFloat($(this).val())*parseFloat(weight));
                var price=$(this).parent().parent().find('.actual-price').val();
                var total_price=parseFloat(price)*parseFloat($(this).val());
                $(this).parent().parent().find('.item-price').val(total_price);
                calculate_total_price();
            }
            $('.discount-percent').blur();
        }
    });
}

// function calculate_item_price(){
//     console.log($(this).parent().parent().find('.actual-price').attr('making_charges'));
// }

function calculate_total_price(){
    var total_price=0;
    $('.item-price').each(function(index, element){
        total_price=parseFloat(total_price)+parseFloat($(element).val());
        $('.total-bill-price').val(total_price);
        $('.amount').val(total_price);
        $('.total-payable-amount').val(total_price);
        $('.balance').val(total_price);
    });
    $('.discount-percent').blur();
}

// function discount_calcuate(percent,amount){
//     var discount_amount=
// }

$(document).ready(function(){
    $('.discount-percent').blur(function(){
        var total_price=$('.total-bill-price').val();
        var discount_amount=parseFloat(total_price)*parseFloat($(this).val())/100;
        $('.discount-value').val(discount_amount);
        var amount_after_discount=parseFloat(total_price)-parseFloat(discount_amount);
        $('.amount').val(amount_after_discount);
        $('.amount').val(amount_after_discount);
        $('.total-payable-amount').val(amount_after_discount);
        $('.balance').val(amount_after_discount);
        $('.vat-percent').blur();
    });

    $('#vat_type').change(function(){
        if($(this).val()==2){
            $('.vat-percent').attr('readonly','');
            $('.vat-percent').val(0);
            $('.vat-value').val(0);
            $('.vat-percent').blur();
        }
        else{
            $('.vat-percent').removeAttr('readonly');
        }
    });

    $('.discount-value').change(function(){
        var total_price=$('.amount').val();
        $('.amount').val(total_price);
        $('.total-payable-amount').val(total_price);
        $('.balance').val(total_price);
        $('.vat-percent').blur();
    });

    $('.vat-percent').blur(function(){
        var vat_amount=parseFloat($('.amount').val())*parseFloat($(this).val())/100;
        $('.vat-value').val(vat_amount);
        $('.total-payable-amount').val(parseFloat($('.amount').val())+vat_amount);
        $('.balance').val(parseFloat($('.total-payable-amount').val())- parseFloat($('.advance').val()));
        $('.advance').blur();
    });
    $('.advance').blur(function(){
        $('.balance').val(parseFloat($('.total-payable-amount').val())-parseFloat($('.advance').val()));

    });
    $('.validate-field').keyup(function(e){
        if(isNaN($(this).val())){
            bootbox.alert("please enter the numeric value only");
            if($(this).hasClass('item-quantity')){
                $(this).val(1);
            }
            else{
                $(this).val(0);
            }
        }
    });
    $('.generate_bill').click(function(){
        $(".generate_bill").html("Bill Generating...");
        var val = $("#form-bill").serialize();
        $.post("/bill/",val, function(data) {
            if(data.success == "true"){
                $(".generate_bill").html("Bill Generated");
                bootbox.alert(data.message);
                window.location.replace("/viewBill/"+data.order_id);
            } else {
                bootbox.alert(data.message);
                $(".generate_bill").html("Generate Bill");
            }
        });
    });
});
