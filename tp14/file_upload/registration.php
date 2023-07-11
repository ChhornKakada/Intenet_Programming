<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <?php
  // echo var_dump($_FILES);
  if (isset($_POST["SubmitBtn"])) {

    $fileName = $_FILES["resume"]["name"];
    $fileSize = $_FILES["resume"]["size"] / 1024;
    $fileType = $_FILES["resume"]["type"];
    $fileTmpName = $_FILES["resume"]["tmp_name"];

    if (
      $fileType == "application/msword"
      || $fileType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      if ($fileSize <= 200) {

        // New file name
        $random = rand(1111, 9999);
        $newFileName = $random . $fileName;

        // File upload path
        $uploadPath = "testUpload/" . $newFileName;

        // function for upload file
        if (move_uploaded_file($fileTmpName, $uploadPath)) {
          echo "Successful";
          echo "File Name: " . $newFileName;
          echo "File Size: " . $fileSize . " kb";
          echo "File Type: " . $fileType;
        }
      } else {
        echo "Maximun upload file size limit is 200 kb";
      }
    } else {
      echo "You can only upload a Word doc file.";
    }
  }
  ?>
</body>

</html>