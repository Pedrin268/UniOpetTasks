<?php
require 'auth.php';
require 'conexao.php';

$usuario_id = $_SESSION['usuario_id'];

$stmt = $conn->prepare("SELECT * FROM tarefas WHERE usuario_id = ? ORDER BY criada_em DESC");
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();

$tarefas = [];
while ($row = $result->fetch_assoc()) {
    $tarefas[] = $row;
}

echo json_encode($tarefas);
$conn->close();
?>