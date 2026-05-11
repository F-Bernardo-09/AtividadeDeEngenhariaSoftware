const initialBoardState = {};

const boardCardDefinitions = [];

function escolherPerfil(perfil) {
  localStorage.setItem("perfil", perfil);
  mostrarKanban();
}

function trocarPerfil() {
  localStorage.removeItem("perfil");
  voltarTelaInicial();
}

function mostrarKanban() {
  document.getElementById("telaInicial").style.display = "none";
  document.getElementById("quadroKanban").style.display = "block";

  const perfil = localStorage.getItem("perfil") || "aluno";
  atualizarHeader(perfil);
  document.getElementById("acoesProfessor").style.display =
    perfil === "professor" ? "block" : "none";
  renderizarQuadro(perfil);
}

function voltarTelaInicial() {
  document.getElementById("telaInicial").style.display = "flex";
  document.getElementById("quadroKanban").style.display = "none";
}

function obterEstadoQuadro() {
  const estadoSalvo = localStorage.getItem("quadroKanbanEstado");
  return estadoSalvo ? JSON.parse(estadoSalvo) : initialBoardState;
}

function salvarEstadoQuadro(estado) {
  localStorage.setItem("quadroKanbanEstado", JSON.stringify(estado));
}

function obterAtividades() {
  const atividadesSalvas = localStorage.getItem("atividadesProfessor");
  return atividadesSalvas ? JSON.parse(atividadesSalvas) : [];
}

function salvarAtividades(atividades) {
  localStorage.setItem("atividadesProfessor", JSON.stringify(atividades));
}

function atualizarHeader(perfil) {
  const header = document.querySelector(".header-kanban h1");
  if (perfil === "aluno") {
    header.textContent = "Aluno: acompanhe as atividades do professor.";
  } else {
    header.textContent = "Professor: crie, mova e remova atividades.";
  }
}

function formatarData(data) {
  return new Date(`${data}T00:00:00`).toLocaleDateString("pt-BR");
}

function criarCardFixo(id, texto, perfil) {
  const card = document.createElement("div");
  card.className = "card";
  card.id = id;
  card.textContent = texto;
  card.draggable = perfil === "aluno";

  if (perfil === "aluno") {
    card.addEventListener("dragstart", aoIniciarArraste);
  }

  return card;
}

function criarCardAtividade(atividade, perfil) {
  const card = document.createElement("div");
  card.className = "card atividade-card";
  card.id = atividade.id;
  card.draggable = perfil === "aluno";

  const titulo = document.createElement("strong");
  titulo.className = "atividade-card__descricao";
  titulo.textContent = atividade.descricao;

  const data = document.createElement("span");
  data.className = "atividade-card__data";
  data.textContent = `Prazo: ${formatarData(atividade.data)}`;

  card.appendChild(titulo);
  card.appendChild(data);

  if (perfil === "aluno") {
    card.addEventListener("dragstart", aoIniciarArraste);
  }

  return card;
}

function renderizarQuadro(perfil) {
  const colunas = {
    todo: document.getElementById("todo"),
    inProgress: document.getElementById("inProgress"),
    done: document.getElementById("done"),
  };

  Object.values(colunas).forEach((coluna) => {
    coluna.querySelectorAll(".card").forEach((card) => card.remove());
    coluna.classList.remove("drag-over");
    coluna.removeEventListener("dragover", permitirArrastar);
    coluna.removeEventListener("drop", soltarCard);
    coluna.removeEventListener("dragleave", removerDragOver);

    if (perfil === "aluno") {
      coluna.addEventListener("dragover", permitirArrastar);
      coluna.addEventListener("drop", soltarCard);
      coluna.addEventListener("dragleave", removerDragOver);
    }
  });

  const estado = obterEstadoQuadro();

  boardCardDefinitions.forEach(({ id, texto }) => {
    const colunaAlvo = estado[id] || initialBoardState[id];
    const card = criarCardFixo(id, texto, perfil);
    colunas[colunaAlvo].appendChild(card);
  });

  obterAtividades().forEach((atividade) => {
    const colunaAlvo = atividade.coluna || "todo";
    const card = criarCardAtividade(atividade, perfil);
    colunas[colunaAlvo].appendChild(card);
  });
}

function criarAtividade(event) {
  event.preventDefault();

  const descricaoInput = document.getElementById("descricaoAtividade");
  const dataInput = document.getElementById("dataAtividade");
  const descricao = descricaoInput.value.trim();
  const data = dataInput.value;

  if (!descricao || !data) {
    return;
  }

  const atividades = obterAtividades();
  atividades.unshift({
    id: `atividade-${Date.now()}`,
    descricao,
    data,
    coluna: "todo",
  });
  salvarAtividades(atividades);

  event.target.reset();
  renderizarQuadro("professor");
}

function aoIniciarArraste(event) {
  event.dataTransfer.setData("text/plain", event.currentTarget.id);
}

function permitirArrastar(event) {
  event.preventDefault();
  event.currentTarget.classList.add("drag-over");
}

function removerDragOver(event) {
  event.currentTarget.classList.remove("drag-over");
}

function soltarCard(event) {
  event.preventDefault();
  const cardId = event.dataTransfer.getData("text/plain");
  const colunaDestino = event.currentTarget.id;

  if (!cardId || !colunaDestino) {
    return;
  }

  const estado = obterEstadoQuadro();
  const atividades = obterAtividades();

  if (cardId.startsWith("atividade-")) {
    const atividade = atividades.find((item) => item.id === cardId);
    if (atividade) {
      atividade.coluna = colunaDestino;
      salvarAtividades(atividades);
    }
  } else {
    estado[cardId] = colunaDestino;
    salvarEstadoQuadro(estado);
  }

  renderizarQuadro(localStorage.getItem("perfil") || "aluno");
}

window.addEventListener("DOMContentLoaded", function () {
  const perfilSalvo = localStorage.getItem("perfil");
  if (perfilSalvo) {
    mostrarKanban();
  }
});

window.addEventListener("storage", function (event) {
  if (
    event.key === "atividadesProfessor" ||
    event.key === "quadroKanbanEstado"
  ) {
    if (document.getElementById("quadroKanban").style.display === "block") {
      renderizarQuadro(localStorage.getItem("perfil") || "aluno");
    }
  }
});
