<?php
if (isset($_POST['contact_email'])) {

    function problem($error)
    {
        echo "We're sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br><br>";
        echo $error . "<br><br>";
        echo "Please go back and fix these errors.<br><br>";
        die();
    }

    // Validating data inputs exist
    if (
        !isset($_POST['contact_name']) ||
        !isset($_POST['contact_email']) ||
        !isset($_POST['contact_message']) ||
        !isset($_POST['contact_subject'])
    ) {
        problem('Sorry, but there appears to be a problem with the form you submitted.');
    }

    //Setting variables
    $name = $_POST['contact_name']; //Their email
    $email = $_POST['contact_email'];
    $subject = $_POST['contact_subject']; //Subject
    $message = $_POST['contact_message'];
    $email_to = "cooleym840@gmail.com"; //My inbox
    
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

    //Making sure all variables are valid (Has specifc formatting)
    if (!preg_match($email_exp, $email)) {
        $error_message .= 'The Email address you entered does not appear to be valid.<br>';
    }
    $string_exp = "/^[A-Za-z .'-]+$/";
    if (!preg_match($string_exp, $name)) {
        $error_message .= 'The Name you entered does not appear to be valid.<br>';
    }
    if (strlen($message) < 2) {
        $error_message .= 'The Message you entered do not appear to be valid.<br>';
    }
    if (strlen($error_message) > 0) {
        problem($error_message);
    }

    $email_message = "Form details below.\n\n";

    function clean_string($string){
        $bad = array("content-type", "bcc:", "to:", "cc:", "href");
        return str_replace($bad, "", $string);
    }

    $email_message .= "Name: " . clean_string($name) . "\n";
    $email_message .= "Email: " . clean_string($email) . "\n";
    $email_message .= "Message: " . clean_string($message) . "\n";

    // create email headers
    $headers = 'From: ' . $email . "\r\n" .
        'Reply-To: ' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    @mail($email_to, $subject, $email_message, $headers);


    echo "Thank you for your submission! <br> I will get back to you as soon as possible!";
}
?>