<?php

echo "YEEHAW";
if (isset($_POST['txt_username']))
{
    $con = mysqli_connect('localhost', 'root', '', 'derrastore');


    $txtName = $_POST['txt_username'];
    $txtPassword = $_POST['txt_password'];
    $txtEmail = "email@email.com";



    $sql = "INSERT INTO `users` (`USERNAME`, `PASSWORD`, `EMAIL`) VALUES ('$txtName', '$txtPassword', '$txtEmail')";




    $rs = mysqli_query($con, $sql);

    if($rs)
    {
    echo "Contact Records Inserted";
    }
    else{
        echo "did not work";
}
}
?>