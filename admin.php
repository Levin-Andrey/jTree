<html>
<head>
    <title>jTree: Admin console</title>
</head>
<body>
<h1>jTree: Admin panel</h1>
<div style="font-size: 16pt;">
    <p>Here you can upload mind map file, which will be later used to generate questions <a href="index.html">here</a>.</p>
    <p>Please, use <a href="http://freemind.sourceforge.net/">FreeMind software</a> to generate mind maps.</p>
    <?php
    $target_dir = "upload/";
    $target_file = $target_dir . basename('data.mm');
    if (isset($_POST["submit"])) {
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
            echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    } ?>
    <form action="admin.php" method="post" enctype="multipart/form-data">
        Select .mm file to upload:<br />
        <div style="margin-top:30px;">
            <input style="float:left;" type="file" name="fileToUpload" id="fileToUpload">
            <input style="float:left;" type="submit" value="Upload File" name="submit">
        </div>
    </form>
</div>
</body>
</html>