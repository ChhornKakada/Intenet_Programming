<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Numeric Array</title>
</head>
<body>
  <?php
  $age = array("Twelve" => "35", "Kakada" => "37", "Sacda" => "43");
    foreach ($age as $x => $val) {
      echo "$x = $val<br>";
    }
  ?>
</body>
</html>