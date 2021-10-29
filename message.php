<?php
    if (isset($_POST['send'])){

        $to = 'ndzalamabasa@gmail.com';
        $subject = 'Consultation From Mabasa N';

        $message = 'Name: ' . $_POST['fullname'] . "\r\n\r\n";

        $message .= 'Phone: ' . $_POST['phone'] . "\r\n\r\n";

        $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);

        $message .= 'Email: ' . $_POST['email'] . "\r\n\r\n";

        $message .= 'Message: ' . $_POST['message'];

        $headers = "From: lesegohealthservices.co.za\r\n";
        if($email) {
            $headers .= "Reply-To: ".$email."\r\n";
        }

        $headers .= 'Content-Type: text/plain; charset=utf-8';

        $success = mail($to, $subject, $message, $headers);
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="5; url=https://lsghealth.co.za/contact">
    <title>Message to Ndzalama Mabasa</title>
</head>
<body>
    <?php
        if (isset($success) && $success) {
    ?>
        
    <h1>Thank you</h1>
    <p>Your message has been sent</p>
        <?php } else { ?>
        
    <h1>Sorry</h1>
    <p>There was a problem, Please Try again.</p>
        <?php } ?>
</body>
</html>