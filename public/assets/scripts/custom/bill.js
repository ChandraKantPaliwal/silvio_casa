function inWords( num ) {
      var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];

      var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

      var c = ['thousand', 'million', ''];

      num = num.toString();

        if ( num.length > 9 ) { 

            return ''; // Number is larger than what function can deal with

        }

        num = ( '000000000' + num ).substr( -9 ); // // Make number into a predictiable nine character string

        num = num.match( /.{3}/g ); // Split string into chuncks of three numbers then reverse order of returned array

        var words = '';

        for( var i = 0; i < c.length; i++ ) {

            var n = num[i];

            var str = '';

            str += ( words != '' ) ? ' ' + c[i] + ' ' : '';

            str += ( n[0] != 0 ) ? ( a[Number( n[0] )] + 'hundred ' ) : '';

            n = n.substr( 1 );

            str += ( n != 0 ) ? ( ( str != '' ) ? 'and ' : '' ) + ( a[Number( n )] || b[n[0]] + ' ' + a[n[1]] ) : '';

            words += str;

        }

        return words;

    };

var a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
var b = ['Hundred', 'Thousand', 'Lakh', 'Crore'];
var c_0 = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Ninteen'];
var d   = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function convertNumToWord(number){
  var c, rm;
  c = 1;
  string = '';
  number == 0 && (string = 'Zero');
  while (number != 0) {
    switch (c) {
      case 1:
        rm = number % 100;
        pass(rm);
        number > 100 && number % 100 != 0 && display('And ');
        number = ~~(number / 100);
        break;
      case 2:
        rm = number % 10;
        if (rm != 0) {
          display(' ');
          display(b[0]);
          display(' ');
          pass(rm);
        }

        number = ~~(number / 10);
        break;
      case 3:
        rm = number % 100;
        if (rm != 0) {
          display(' ');
          display(b[1]);
          display(' ');
          pass(rm);
        }

        number = ~~(number / 100);
        break;
      case 4:
        rm = number % 100;
        if (rm != 0) {
          display(' ');
          display(b[2]);
          display(' ');
          pass(rm);
        }

        number = ~~(number / 100);
        break;
      case 5:
        rm = number % 100;
        if (rm != 0) {
          display(' ');
          display(b[3]);
          display(' ');
          pass(rm);
        }

        number = ~~(number / 100);
    }
    ++c;
  }
  return string;
}

function display(s){
  var t;
  t = string;
  string = s;
  string += t;
}

function pass(number){
  var q, rm;
  number < 10 && display(a[number]);
  number > 9 && number < 20 && display(c_0[number - 10]);
  if (number > 19) {
    rm = number % 10;
    if (rm == 0) {
      q = ~~(number / 10);
      display(d[q - 2]);
    }
     else {
      q = ~~(number / 10);
      display(a[rm]);
      display(' ');
      display(d[q - 2]);
    }
  }
}

$(document).ready(function(){
    var arr=$('#net-amount').html().split('.');
    var net_amount=parseFloat($('#net-amount').html());
    $('#amount-in-word').html(convertNumToWord(arr[0])).append(" Rupees ");
    if(arr.length>1){
        $('#amount-in-word').append("and ").append(convertNumToWord(arr[1])).append(" Paisa");
    }
    $("#print_invoce").click(function(){
        window.print();
    });
});

