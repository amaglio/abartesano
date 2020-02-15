function cargarSlider()
{
    var mySwiper = new Swiper ('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
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
        autoplay: {
          delay: 4000,
        }
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
  var scroll = $(window).scrollTop();
 
  if(scroll > 150)
    $( ".navbar" ).addClass( "menu-negro" );
  else
    $( ".navbar" ).removeClass( "menu-negro" );

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
      $("#button_what").css("display","block");
      
     }
     else
     {
        $("#button_up").css("display","none");
        $("#button_what").css("display","none");
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

function controladorScrollto(){

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();


      var width = $(window).width();
      var yOffset;

      if (width < 992){
         yOffset = -170;
      }
      else
      {
        yOffset = -100;
      }

      var element = document.querySelector(this.getAttribute("href"));
      
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});

      
    });
  });
}

function controladorContacto(){
  
  $( "#presupuesto" ).submit(function( event ) {
    alert( "Handler for .submit() called." );
    event.preventDefault();
    $("#imagen_loading").show();

    var formulario = {};

    formulario.nombre = $("input#nombre").val();
    formulario.apellido = $("input#apellido").val();
    formulario.email = $("input#email").val();
    formulario.telefono = $("input#telefono").val(); 
    formulario.comentario = $("textarea#comentario").val(); 

    $.ajax({
      url: "./mail/procesa_email.php",
      data: { variable: JSON.stringify(formulario) },
      async: true,
      type: 'POST',
      dataType: 'JSON',
      success: function(data)
      { 
        console.log(data);
        $("#imagen_loading").hide();
        $("#enviar").prop( "disabled", false );
        $("#enviar").css( "background-color", '#a68342' );
        $("#div_resultado").html( "<div class='resultado'> Email enviado exitosamente </div>" );
        $( "#presupuesto" )[0].reset();

      },
      error: function(x, status, error){
        console.log("error: "+error );
      } 


  });

  });

}

$(document).ready(function() {

  $('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
  });

  cargarSlider();  
  cargarTrabajos("porteros"); 
  controladorMenu();
  controladorBottomup();
  controladorScrollto();
  controladorContacto();

})