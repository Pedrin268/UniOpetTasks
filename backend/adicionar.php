<?php
require 'auth.php';
require 'conexao.php';

$titulo = $_POST['titulo'] ?? '';
$origem = $_POST['origem'] ?? 'pessoal';
$usuario_id = $_SESSION['usuario_id'];

if (!empty($titulo)) {
    $stmt = $conn->prepare("INSERT INTO tarefas (usuario_id, titulo, origem) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $usuario_id, $titulo, $origem);
    $stmt->execute();
}
$conn->close();
?>