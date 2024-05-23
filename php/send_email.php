<?php
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    $fromEmail = 'juanjo_mendoza130@outlook.com'; // Correo electrónico desde el cual se enviará el mensaje
    $toEmail = 'jmendoza@s-spin.com.mx'; 
    $replyToEmail = $toEmail;
    $name = $data['name'];
    $email = $data['email'];
    $number = $data['number'];
    $message = $data['message'];
    $recaptcha = $data['recaptcha'];
    
    // Verificar reCAPTCHA
    $recaptchaSecret = '6LcJSeYpAAAAAN9agagXPuWTl9DoSVnkDDGPSQ6G';
    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptchaSecret&response=$recaptcha");
    $responseKeys = json_decode($response, true);
    
    if(intval($responseKeys["success"]) !== 1) {
        echo 'Error en la verificación del reCAPTCHA.';
        exit;
    }
    
    // Encabezados del correo
    $headers = "From: $fromEmail\r\n";
    $headers .= "Reply-To: $replyToEmail\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // Enviar el correo
    if(mail($name, $email, $number, $message , $headers)) {
        echo "Correo enviado exitosamente";
    } else {
        echo "Error al enviar el correo";
    }
