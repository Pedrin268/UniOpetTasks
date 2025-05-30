<?php
require_once 'env.php';
loadEnv(__DIR__ . '/../.env');

$host = $_ENV['DB_HOST'];
$db = $_ENV['DB_NAME'];
$user = $_ENV['DB_USER'];
$pass = $_ENV['DB_PASS'];

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}
?>