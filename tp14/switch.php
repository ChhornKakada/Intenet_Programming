<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <?php
    $myFavColor = 'black';
    switch ($myFavColor) {
      case 'pink':
        echo 'My favorite car color is pink!';
        break;
      
      case 'red':
        echo 'My favorite car color is red!';
        break;

      case 'orange':
        echo 'My favorite car color is orange!';
        break;

      default:
        echo 'My favorite car color is not pink, red, or orange!';
    }
  ?>
</body>
</html>