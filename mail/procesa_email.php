<?php
 

$json = json_decode($_POST['variable']);
$return['mensaje'] = "Mensaje: ".$_POST['variable'];
$return['mensaje2'] = "Variable POST: ".gettype($_POST['variable']);
$obj = json_decode($_POST['variable']);

$return['nombre'] = "Variable POST[nombre]: ".$obj->{'nombre'};

//$_POST['variable']['nombre'];
//print json_encode($return);

if(empty($obj->{'nombre'}) || empty($obj->{'telefono'})  )
{

	   $return["error"] = true;
	   $return["resultado"] = "Error nombre y email";
}
else
{
	$nombre = strip_tags(htmlspecialchars($obj->{'nombre'}));
	$apellido = strip_tags(htmlspecialchars($obj->{'apellido'}));
	$email = strip_tags(htmlspecialchars($obj->{'email'}));
	$telefono = strip_tags(htmlspecialchars($obj->{'telefono'})); 
	$comentario = strip_tags(htmlspecialchars($obj->{'comentario'})); 

	require("./PHPMailer-master/PHPMailerAutoload.php");
	$mail = new PHPMailer();

	$mail->IsSMTP();
	$mail->SMTPAuth = true;
	$mail->SMTPSecure = 'ssl';
	$mail->Host = "smtp.gmail.com";  
	$mail->Username = "digipayargentina@gmail.com";  
	$mail->Password = "digipay2016"; 
	$mail->Port = 465;  
	$mail->From = "abartesano@web.com";  
	$mail->FromName = "Contacto web"; 

	$mail->AddAddress("adrian.magliola@gmail.com"); 
	$mail->AddAddress("bertinialejandrojorge@gmail.com"); 


	$mail->IsHTML(true);  
	$mail->Subject = "Contacto Web - Abartesano";  

	$body = "<strong>Nombre: </strong>".$obj->{'nombre'}."<br>"; 

	if( $apellido )
		$body .= "<strong>Apellido: </strong>".$apellido."<br>"; 

	$body .= "<strong>Telefono: </strong>".$telefono."<br>"; 

	if( $email )
		$body .= "<strong>Email: </strong>".$email."<br>"; 
  	
 	$body .= "<strong>Comentario: </strong>".$comentario."<br>"; 

	$mail->Body = $body;  
	$exito = $mail->Send(); // Envía el correo.

	//También podríamos agregar simples verificaciones para saber si se envió:
	if($exito){
		$return["resultado"] = "El correo fue enviado correctamente, el mismo será respondido a la brevedad. <br> Muchas gracias por su consulta.";
		$return["error"] = false;
	}else{
		$return["resultado"] = "Hubo un inconveniente. Por favor, intentá nuevamente o escribrinos a nuestro email: <b> info@vyodelquinton.com  </b> <br> Muchas gracias por su consulta.";
		$return["error"] = true;
	}

}
   
 
print json_encode($return);
?>
