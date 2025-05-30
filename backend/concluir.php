<?php
require 'auth.php';
require 'conexao.php';

$id = $_POST['id'] ?? 0;
$usuario_id = $_SESSION['usuario_id'];

if ($id > 0) {
    $stmt = $conn->prepare("UPDATE tarefas SET concluida = 1 WHERE id = ? AND usuario_id = ?");
    $stmt->bind_param("ii", $id, $usuario_id);
    $stmt->execute();
}
$conn->close();
?>