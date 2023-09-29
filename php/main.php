<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "php_sign";
$connect = new mysqli($servername, $username, $password, $dbname);


function signin($connect){
    $email = $_POST['email'];
    $passcode = $_POST['password'];

    $sql = $connect->prepare('SELECT 1 FROM users WHERE email=? AND passcode=?');
    $sql->bind_param('ss', $email, $passcode);
    $sql->execute();
    $found = (bool) $sql->get_result()->fetch_row();
    if($found){ echo "found"; }
    else{ echo "notfound"; }
}

function signup($connect){
    $name = $_POST['name'];
    $contact = $_POST['contact'];
    $email = $_POST['email'];
    $passcode = $_POST['password'];

    $sql = $connect->prepare('SELECT 1 FROM users WHERE email=?');
    $sql->bind_param('s', $email);
    $sql->execute();
    $exists = (bool) $sql->get_result()->fetch_row();
    if($exists){ echo "exists"; }
    else{
        $sql = $connect->prepare("INSERT INTO users (username, contact, email, passcode) VALUES (?, ?, ?, ?)");
        $sql->bind_param("ssss", $name, $contact, $email, $passcode);
        $sql->execute();
        echo "registered";
    }
}


function profile($connect){
    $email = $_POST['email'];

    $sql = $connect->prepare('SELECT 1 FROM users WHERE email=?');
    $sql->bind_param('s', $email);
    $sql->execute();

    $sql = "SELECT username, contact, email, passcode FROM users WHERE email='$email'";
    $result = $connect->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo $row["username"]."&".$row["contact"]."&".$row["email"]."&".$row["passcode"];
        }
    }
    else { echo "0 results"; }
}

function update($connect){
    $name = $_POST['name'];
    $contact = $_POST['contact'];
    $email = $_POST['email'];
    $email_c = $_POST['email_c'];
    $passcode = $_POST['password'];

    $sql = "UPDATE users SET username='$name', contact='$contact', email='$email_c', passcode='$passcode' WHERE email='$email'";
    $sql = $connect->query($sql);

    if ($sql) { echo "updated"; }
    else { echo "error"; }
}

$fuc = $_POST['fuc'];
$fuc($connect);

?>