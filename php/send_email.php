<?php

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
$message = $data['message'];
$recaptcha = $data['recaptcha'];

$fromEmail = 'contacto@s-spin.com.mx';
$toEmail = 'contacto@s-spin.com.mx';

$recaptchaSecret = '6LcJSeYpAAAAAN9agagXPuWTl9DoSVnkDDGPSQ6G';
$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptchaSecret&response=$recaptcha");
$responseKeys = json_decode($response, true);

if (intval($responseKeys["success"]) !== 1) {
    echo 'Error en la verificación del reCAPTCHA.';
    exit;
}

// Configurar PHPMailer
$mail = new PHPMailer(true);

try {

    $mail->isSMTP();
    $mail->Host = 'mail.s-spin.com.mx';
    $mail->SMTPAuth = true;
    $mail->Username = 'contacto@s-spin.com.mx';
    $mail->Password = 'Sspin2024*5689';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
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
    echo "Error al enviar el correo. Mailer Error: {$mail->ErrorInfo}";
}