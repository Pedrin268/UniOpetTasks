<?php
session_start();

if (isset($_SESSION['usuario_id'])) {
    echo json_encode([
        'logado' => true,
        'usuario_id' => $_SESSION['usuario_id'],
        'nome' => $_SESSION['usuario_nome']
    ]);
} else {
    echo json_encode(['logado' => false]);
}
?>