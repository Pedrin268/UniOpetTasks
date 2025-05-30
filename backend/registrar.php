<?php
require 'conexao.php';

$nome = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';
$convite = $_POST['convite'] ?? null;

if ($nome && $email && $senha) {
    // Criptografa a senha
    $hash = password_hash($senha, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, senha, convite) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nome, $email, $hash, $convite);
    
    if ($stmt->execute()) {
        echo json_encode(['sucesso' => true]);
    } else {
        echo json_encode(['sucesso' => false, 'erro' => 'Erro ao inserir no banco']);
    }
} else {
    echo json_encode(['sucesso' => false, 'erro' => 'Campos obrigatórios não preenchidos']);
}

$conn->close();
?>