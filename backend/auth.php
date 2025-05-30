<?php
session_start();

if (!isset($_SESSION['usuario_id'])) {
    http_response_code(403);
    echo json_encode(['erro' => 'Acesso negado']);
    exit;
}
?>