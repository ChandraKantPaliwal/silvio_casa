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
                window.location.replace("/");
            } else {
                bootbox.alert(data.message);
                $(".generate_bill").html("Generate Bill");
            }
        });
    });
});
function initialize(){
    // ComponentsPickers.init();
    $(function() {

    $.extend($.tablesorter.themes.bootstrap, {
        // these classes are added to the table. To see other table classes available,
        // look here: http://twitter.github.com/bootstrap/base-css.html#tables
        table      : 'table table-bordered',
        header     : 'bootstrap-header', // give the header a gradient background
        footerRow  : '',
        footerCells: '',
        icons      : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
        sortNone   : 'bootstrap-icon-unsorted',
        sortAsc    : 'fa fa-chevron-up',
        sortDesc   : 'fa fa-chevron-down',
        active     : '', // applied when column is sorted
        hover      : '', // use custom css here - bootstrap class may not override it
        filterRow  : '', // filter row class
        even       : '', // odd row zebra striping
        odd        : ''  // even row zebra striping
    });

    // call the tablesorter plugin and apply the uitheme widget
    $(".tablesorter").tablesorter({
        // this will apply the bootstrap theme if "uitheme" widget is included
        // the widgetOptions.uitheme is no longer required to be set
        theme : "bootstrap",
        widthFixed: true,
        dateFormat : "ddmmyyyy",

        headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon!

        // widget code contained in the jquery.tablesorter.widgets.js file
        // use the zebra stripe widget if you plan on hiding any rows (filter widget)
        widgets : [ "uitheme", "filter", "zebra" ],

        widgetOptions : {
            // using the default zebra striping class name, so it actually isn't included in the theme variable above
            // this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden
            zebra : ["even", "odd"],

            // reset filters button
            filter_reset : ".reset"

            // set the uitheme widget to use the bootstrap theme class names
            // this is no longer required, if theme is set
            // ,uitheme : "bootstrap"

        },
        headers: {
            0:{
                // disable it by setting the property sorter to false
                sorter: false
            }
        }
        }).tablesorterPager({

            // target the pager markup - see the HTML block below
            container: $(".ts-pager"),

            // target the pager page select dropdown - choose a page
            cssGoto  : ".pagenum",

            // remove rows from the table to speed up the sort of large tables.
            // setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
            removeRows: false,

            // output string - default is '{page}/{totalPages}';
            // possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
            output: '{startRow} - {endRow} / {filteredRows} ({totalRows})'

        });
    });
}
