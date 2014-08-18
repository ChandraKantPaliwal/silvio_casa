var $validate = $("#price-form").validate({
    rules: {
        price: {
            required:true,
            number:true
        },
        messages: {
            price: {
                required: "Please enter price",
                number: "Please Enter Numeric value"
            }
        }
    }
});

$(document).ready(function(){
    $('.save-price').click(function(){
        $('.save-price').html("validating...").fadeIn('slow');
        $('#price-form').submit();
        $('.save-price').html("Submit").fadeIn('slow');
    });
});