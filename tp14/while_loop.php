<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <?php
    $i = 1;
    while ($i <= 5) {
      if ($i == 1) {
        echo "Hello while $i time" . "<br>";
      } else {
        echo "Hello while $i times" . "<br>";
      }
      $i++;
    }
  ?>
</body>
</html>