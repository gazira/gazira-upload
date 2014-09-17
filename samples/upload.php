<?php
header('Content-type: application/json');
$id = rand(100000, 999999);
$result = Array(
    "code" => 200,
    "data" => Array(
        "id" => $id,
        "post" => $_POST,
        "file" => $_FILES
    )
);
echo json_encode($result);