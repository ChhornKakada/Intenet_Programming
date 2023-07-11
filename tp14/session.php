<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <?php
    session_start();

    // store session date
    $_SESSION["username"] = "kakada";
    $_SESSION["email"] = "chhornkakada22@gmail.com";

    // retrieve session data
    echo $_SESSION["username"];
    echo "<br>";
    echo $_SESSION["email"];
  ?>
</body>
</html>