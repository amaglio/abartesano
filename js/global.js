function cargarSlider()
{
    var mySwiper = new Swiper ('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      })

}


function cargarTrabajos(pTipoTrabajo)
{ 
  
  $.getJSON( "./data/trabajos.json", function( data ) 
  { 
    $( "#gallery" ).remove();
    $(".divGaleria").append("<div id='gallery' style='display:none'></div>");
    
    var trabajos = data;

    // Trabajos
    $.each( trabajos, function( tipoTrabajo, trabajosDelTipo ) {
        
        console.log("Json: "+tipoTrabajo+":"+typeof(tipoTrabajo)  );
        console.log("Parametro: "+pTipoTrabajo+":"+typeof(pTipoTrabajo)  );
        console.log(tipoTrabajo == pTipoTrabajo);


        if( tipoTrabajo.trim() == pTipoTrabajo.trim() )
        { //console.log("si"); 

          $.each( trabajosDelTipo, function( key, val ) {
              console.log( val.pathImagen );
              $("#gallery").append(" <img alt='Trabajo' src='"+val.pathImagen+"' data-image='"+val.pathImagen+"' data-image-mobile='"+val.pathImagen+"'  data-thumb-mobile='"+val.pathImagen+"' data-description='This is a Lemon Slice' style='display:none'> ");
            
          });

        }
    });

    $("#gallery").unitegallery();

  });
}

function controladorMenu()
{
  $(window).scroll(function (event) {
      var scroll = $(window).scrollTop();
      console.log(scroll);
      if(scroll > 150)
        $( ".navbar" ).addClass( "menu-negro" );
      else
        $( ".navbar" ).removeClass( "menu-negro" );
  });

}


 

$( ".tipo-de-trabajo" ).click(function() {
    const tipoTrabajo = $(this).text().toLowerCase();
    console.log("Onclic: "+tipoTrabajo);
    cargarTrabajos(tipoTrabajo); 
});



$(document).ready(function() {

  cargarSlider();  
  cargarTrabajos("barandas"); 

  controladorMenu();

})