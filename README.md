# 📋 Quadro Kanban Interativo

Um quadro Kanban web responsivo com suporte para dois perfis de usuário: **Professor** e **Aluno**.

## 🎯 Características

### Para Professores

- Criar novas atividades com descrição e data de prazo
- Visualizar todas as atividades criadas
- Gerenciar o quadro Kanban compartilhado

### Para Alunos

- Visualizar atividades criadas pelo professor
- Arrastar e soltar tarefas entre colunas (To Do, In Progress, Done)
- Acompanhar o progresso das atividades

## 🏗️ Estrutura do Projeto

```
.
├── index.html                 # Arquivo principal HTML
├── README.md                  # Este arquivo
├── src/
│   ├── js/
│   │   └── kanban.js          # Lógica da aplicação
│   └── style/
│       └── style.css          # Estilos e layout
```

## 🚀 Como Usar

### Iniciar a Aplicação

1. Abra o arquivo `index.html` em um navegador web
2. Escolha seu perfil (Professor ou Aluno)
3. Comece a usar o quadro Kanban

### Para Professores

1. Preencha a descrição da atividade
2. Selecione uma data de prazo
3. Clique em "Adicionar atividade"
4. As atividades aparecerão na coluna "To Do"

### Para Alunos

1. Visualize as atividades na coluna "To Do"
2. Arraste as tarefas para "In Progress" enquanto trabalha
3. Mova para "Done" quando terminar
4. Clique em "Trocar Perfil" para mudar de usuário

## 🎨 Estilos e Design

- Design limpo e moderno com paleta de cores harmônica
- Interface responsiva que se adapta a diferentes tamanhos de tela
- Animações suaves para melhor experiência do usuário
- Feedback visual ao arrastar e soltar tarefas

## 💾 Armazenamento

O quadro Kanban utiliza `localStorage` para salvar:

- Perfil do usuário atual
- Estado das tarefas entre as colunas
- Atividades criadas pelo professor

## 🔄 Trocar de Perfil

Clique no botão "Trocar Perfil" no topo do quadro Kanban para retornar à tela inicial e escolher outro perfil.

## 📝 Notas

- As tarefas são arrastáveis apenas para o perfil de Aluno
- O perfil de Professor pode apenas visualizar e criar novas atividades
- Todas as alterações são salvas automaticamente no navegador
