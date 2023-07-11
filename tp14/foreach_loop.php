<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>foreach loop</title>
</head>
<body>
  <?php
    $salary[] = 2000;
    $salary[] = 3000;
    $salary[] = 5000;
    $salary[] = 8000;

    foreach ($salary as $value) {
      echo "Salary: $value<br>";
    }

  ?>
</body>
</html>