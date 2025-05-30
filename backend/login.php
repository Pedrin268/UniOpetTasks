<?php
require 'conexao.php';
session_start();

$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';

if ($email && $senha) {
    $stmt = $conn->prepare("SELECT id, nome, senha FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows === 1) {
        $usuario = $resultado->fetch_assoc();
        if (password_verify($senha, $usuario['senha'])) {
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['usuario_nome'] = $usuario['nome'];
            echo json_encode(['sucesso' => true, 'usuario' => $usuario['nome']]);
            exit;
        }
    }
}

echo json_encode(['sucesso' => false]);

$conn->close();
?>