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
        
        // console.log("Json: "+tipoTrabajo+":"+typeof(tipoTrabajo)  );
        // console.log("Parametro: "+pTipoTrabajo+":"+typeof(pTipoTrabajo)  );
        // console.log(tipoTrabajo == pTipoTrabajo);


        if( tipoTrabajo.trim() == pTipoTrabajo.trim() )
        { //console.log("si"); 

          $.each( trabajosDelTipo, function( key, val ) {
              // console.log( val.pathImagen );
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
      // console.log(scroll);
      if(scroll > 150)
        $( ".navbar" ).addClass( "menu-negro" );
      else
        $( ".navbar" ).removeClass( "menu-negro" );
  });

}


function controladorBottomup()
{
 
  $(window).scroll(function (event) {
      
      var st = $(this).scrollTop();
 
     lastScrollTop = st;

     if( lastScrollTop > 438 )
     {
      $("#button_up").css("display","block");
     }
     else
     {
        $("#button_up").css("display","none");
     }
  });
 

}
 

$( ".tipo-de-trabajo" ).click(function() {
    const tipoTrabajo = $(this).text().toLowerCase();
    // console.log("Onclic: "+tipoTrabajo);
    cargarTrabajos(tipoTrabajo); 
});

$("#button_up").click(function(){
    // console.log("apreto");  
    //$(window).scrollTop(0);
    //$("html, body").animate({ scrollTop: 0 }, 600);
     $("HTML, BODY").animate({ scrollTop: 0 }, 1000); 
});

$(document).ready(function() {

  cargarSlider();  
  cargarTrabajos("barandas"); 
  controladorMenu();
  controladorBottomup();
})