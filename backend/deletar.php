<?php
require 'conexao.php';
require 'auth.php';

$id = $_POST['id'] ?? 0;
$usuario_id = $_SESSION['usuario_id'] ?? 0;

if ($id > 0 && $usuario_id > 0) {
    $stmt = $conn->prepare("DELETE FROM tarefas WHERE id = ? AND usuario_id = ?");
    $stmt->bind_param("ii", $id, $usuario_id);
    $stmt->execute();
}
$conn->close();
?>