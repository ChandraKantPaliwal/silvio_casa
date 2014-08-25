$(document).ready(function() {
     //alert('title');
    // Setup - add a text input to each footer cell
    $('#sample_2 tfoot th').each( function () {
        var title = $('#sample_2 thead th').eq( $(this).index() ).text();
      //  alert('title:'+title);
        $(this).html( '<input type="text" placeholder="'+title+'"/>' );
    } );
 
    // DataTable
    var table = $('#sample_2').DataTable();
   
    // Apply the search
    // table.columns().eq( 0 ).each( function ( colIdx ) {
    //     $( 'input', table.column( colIdx ).footer() ).on( 'keyup change', function () {
    //         table
    //             .column( colIdx )
    //             .search( this.value )
    //             .draw();
    //     } );
    // } );

    // table.columns().eq( 0 ) .each( function ( colIdx ) {
    //     $( 'input', table.column( colIdx ).footer() ).on( 'keyup change', function () {
    //         table
    //             .column( colIdx )
    //             .search( this.value )
    //             .draw();
    //     } );
    // } );


} );
