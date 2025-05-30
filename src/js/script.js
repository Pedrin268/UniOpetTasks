let usuario = null;

function login() {
  const email = document.getElementById('login_email').value;
  const senha = document.getElementById('login_senha').value;
  fetch('backend/login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `email=${email}&senha=${senha}`
  }).then(res => res.json()).then(data => {
    if (data.sucesso) {
      usuario = data.usuario;
      document.getElementById('formLogin').style.display = 'none';
      document.getElementById('formCadastro').style.display = 'none';
      document.getElementById('logo-topo').style.display = 'none';
      document.getElementById('formArea').style.display = 'none';
      document.getElementById('tarefas').style.display = 'flex';
      carregarTarefas();
    } else {
      alert('Login inválido');
    }
  });
}

function registrar() {
  const nome = document.getElementById('cad_nome').value;
  const email = document.getElementById('cad_email').value;
  const senha = document.getElementById('cad_senha').value;
  const convite = document.getElementById('cad_convite').value;
  fetch('backend/registrar.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `nome=${nome}&email=${email}&senha=${senha}&convite=${convite}`
  }).then(res => res.json()).then(data => {
    if (data.sucesso) {
      alert('Cadastro realizado, agora faça login.');
      // Volta para o login automaticamente
      document.getElementById('formCadastro').style.display = 'none';
      document.getElementById('formLogin').style.display = 'flex';
      // Limpa campos do cadastro
      document.getElementById('cad_nome').value = '';
      document.getElementById('cad_email').value = '';
      document.getElementById('cad_senha').value = '';
      document.getElementById('cad_convite').value = '';
      checarCadastro();
    } else {
      alert('Erro no cadastro: ' + data.erro);
    }
  });
}

function mostrarForm(origem) {
  document.getElementById('nova_tarefa_origem').value = origem;
  document.getElementById('formNovaTarefa').style.display = 'block';
}

function carregarTarefas() {
  fetch('backend/tarefas.php')
    .then(res => res.json())
    .then(tarefas => {
      document.getElementById('lista_pessoal').innerHTML = '';
      document.getElementById('lista_grupo').innerHTML = '';

      tarefas.forEach(t => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span style="${t.concluida == 1 ? 'text-decoration: line-through;' : ''}">${t.titulo}</span>
          <div style="display: flex; gap: 10px;">
            ${t.concluida == 0 ? `<button onclick="concluirTarefa(${t.id})">✔</button>` : ''}
            <button onclick="deletarTarefa(${t.id})">🗑️</button>
          </div>
        `;

        if (t.origem === 'pessoal') {
          document.getElementById('lista_pessoal').appendChild(li);
        } else {
          document.getElementById('lista_grupo').appendChild(li);
        }
      });
    });
}

function adicionarTarefa() {
  const titulo = document.getElementById('nova_tarefa_titulo').value;
  const origem = document.getElementById('nova_tarefa_origem').value;

  if (!titulo) return alert("Digite o título da tarefa.");

  fetch('backend/adicionar.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `titulo=${encodeURIComponent(titulo)}&origem=${origem}`
  }).then(() => {
    document.getElementById('nova_tarefa_titulo').value = '';
    document.getElementById('formNovaTarefa').style.display = 'none';
    carregarTarefas();
  });
}

function concluirTarefa(id) {
  fetch('backend/concluir.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'id=' + id
  }).then(() => carregarTarefas());
}

function deletarTarefa(id) {
  if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
    fetch('backend/deletar.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'id=' + id
    }).then(() => carregarTarefas());
  }
}

function logout() {
  usuario = null;
  document.getElementById('tarefas').style.display = 'none';
  document.getElementById('formLogin').style.display = 'flex';
}

// Função para checar campos do login
function checarLogin() {
  const email = document.getElementById('login_email').value.trim();
  const senha = document.getElementById('login_senha').value.trim();
  const token = document.querySelector('#formLogin .cf-turnstile input[name="cf-turnstile-response"]')?.value;
  document.getElementById('btnLogin').disabled = !(email && senha && token);
}

// Função para checar campos do cadastro
function checarCadastro() {
  const nome = document.getElementById('cad_nome').value.trim();
  const email = document.getElementById('cad_email').value.trim();
  const senha = document.getElementById('cad_senha').value.trim();
  const token = document.querySelector('#formCadastro .cf-turnstile input[name="cf-turnstile-response"]')?.value;
  document.getElementById('btnCadastro').disabled = !(nome && email && senha && token);
}

// Adiciona listeners nos campos
document.getElementById('login_email').addEventListener('input', checarLogin);
document.getElementById('login_senha').addEventListener('input', checarLogin);
document.getElementById('cad_nome').addEventListener('input', checarCadastro);
document.getElementById('cad_email').addEventListener('input', checarCadastro);
document.getElementById('cad_senha').addEventListener('input', checarCadastro);

// Função global para ser chamada pelo Turnstile ao resolver
window.turnstileCallback = function () {
  checarLogin();
  checarCadastro();
};

// Adiciona callback ao widget Turnstile
document.querySelectorAll('.cf-turnstile').forEach(el => {
  el.setAttribute('data-callback', 'turnstileCallback');
});

// Verificar login automático ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  fetch('backend/verificar-login.php')
    .then(res => res.json())
    .then(data => {
      if (data.logado) {
        usuario = { id: data.usuario_id, nome: data.nome };
        document.getElementById('formLogin').style.display = 'none';
        document.getElementById('formCadastro').style.display = 'none';
        document.getElementById('formArea').style.display = 'none';
        document.getElementById('logo-topo').style.display = 'none';
        document.getElementById('tarefas').style.display = 'flex';
        document.getElementById('nome_usuario').textContent = usuario.nome || '';
        carregarTarefas();
      }
    });
});

// Atualizar função logout para chamar logout.php
function logout() {
  fetch('backend/logout.php')
    .then(() => {
      usuario = null;
      document.getElementById('tarefas').style.display = 'none';
      document.getElementById('formLogin').style.display = 'block';
    });
}