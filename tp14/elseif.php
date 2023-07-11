<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <?php
    $date = date("m-d");

    if ($date == "07-22") {
      echo "Wishing you a very Happy Birthday.";
    } elseif ($date == "08-15") {
      echo "Happy Independence Day";
    } else {
      echo "See you next year!";
    }
  ?>
</body>
</html>