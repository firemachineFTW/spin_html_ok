<?php

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';

// Obtener los datos del POST
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$name = isset($data['name']) ? $data['name'] : '';
$email = isset($data['email']) ? $data['email'] : '';
$phone = isset($data['phone']) ? $data['phone'] : '';
$message = isset($data['message']) ? $data['message'] : '';
$recaptcha = isset($data['recaptcha']) ? $data['recaptcha'] : '';

$fromEmail = 'contacto@s-spin.com.mx';
$toEmail = 'contacto@s-spin.com.mx';

$recaptchaSecret = '6LcJSeYpAAAAAN9agagXPuWTl9DoSVnkDDGPSQ6G';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array('secret' => $recaptchaSecret, 'response' => $recaptcha)));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

$responseKeys = json_decode($response, true);
error_log(print_r($responseKeys, true)); 

if (!isset($responseKeys["success"]) || intval($responseKeys["success"]) !== 1) {
    echo 'Error en la verificación del reCAPTCHA.';
    exit;
}

// Configurar PHPMailer
$mail = new PHPMailer();

try {
    $mail->isSMTP();
    $mail->Host = 'mail.s-spin.com.mx';
    $mail->SMTPAuth = true;
    $mail->Username = 'contacto@s-spin.com.mx';
    $mail->Password = 'Sspin2024*5689';
    $mail->SMTPSecure = 'ssl'; // En PHP 7.4 se usa 'ssl' en lugar de PHPMailer::ENCRYPTION_SMTPS
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';

    $mail->SMTPDebug = 2;
    $mail->Debugoutput = 'html';

    // Remitente y destinatario
    $mail->setFrom($fromEmail, 'Contacto');
    $mail->addAddress($toEmail);
    $mail->addReplyTo($email);

    // Contenido del correo
    $mail->isHTML(true);
    $mail->Subject = 'Nuevo mensaje de contacto';
    $mail->Body = "Nombre:  $name<br><br>Email:  $email<br><br>Teléfono:  $phone<br><br>Mensaje:<br>$message";

    $mail->send();
    echo 'Correo enviado exitosamente';
} catch (Exception $e) {
    echo "Error al enviar el correo. Mailer Error: " . $mail->ErrorInfo;
}
