<?php
    $name     =   $_POST['name'];
    $email    =   $_POST['email'];
    $subject  =   $_POST['subject'];
    $message  =   $_POST['message'];
    $to ='miguelriveroloop@gmail.com';

 $messages = "";
 $messages .= "*Name: " . htmlspecialchars($name, ENT_QUOTES) . "<br>\n";
 $messages .= "*Email: " . htmlspecialchars($email, ENT_QUOTES) . "<br>\n";
 $messages .= "Comment: " . htmlspecialchars($message, ENT_QUOTES) . "<br>\n";
   $lowmsg = strtolower($messages);

   $headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=iso-8859-1\r\n";
   $headers .= "From: \"" . $name . "\" <" . $email . ">\r\n";
   $headers .= "Reply-To: " .  $email . "\r\n";
   $messages = utf8_decode($messages);  mail($to, "Note from the Contact Form", $messages, $headers);

   if ($messages){
     echo 'success';
   }else{
      echo 'failed';
   }
  ?>