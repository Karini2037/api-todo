const express = require("express"); // Requirindo tudo do pacote express
const app = express(); // Confidurando ele para essa variável app
app.use(express.json()); // App vai receber tudo que recebe e envia em json

const usuarios = [
    {id: 1, nome: "Gustavo", email: "gustavo@gmail.com"},
    {id: 2, nome: "João", email: "joao@gmail.com"},
];

/* Criando rotas */
app.get('/', (req, res) => res.json("Olá, Mundo! Para acessar os usuarios da API, digite: '/usuarios'")); // Cria uma rota e a resposta será a que está ecrita no res.json


app.get('/usuarios', (req, res) => res.json(usuarios)); // A mesma coisa aqui, podemos ver que criamos uma rota usuarios, e quando ele é requerido, trás a lista de usuarios.
app.get('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id == req.params.id);
    if(!usuario) return res.status(404).json({erro: "Usuários não encontrado"}) // Se ele não econtrar o usuário retorna um status de erro e uma mensagem de erro
        res.json(usuario) // Se ele achar o usuario ele retorna o usuário
});
app.post('/usuarios', (req, res) => {
    const novo = { id: usuarios.length + 1, ...req.body } // Criando um novo id para a lista
    usuarios.push(novo) // Adicionando a var novo no array usuarios
    res.status(201).json(novo)
})



// Listagem de tarefas
const tarefas = [
    {id: 1, descricao: "Criar a rota de listagem"},
];

// Adicionar nova tarefa

app.get('/tarefas', (req, res) => res.json(tarefas)); // Criando rota para encontrar tarefa
app.get('/tarefas/:id', (req, res) => { // Criando rota para somente ver um item da lista
    const tarefa = tarefas.find(t => t.id == req.params.id);
    if(!tarefa) return res.status(404).json({erro: "Tarefa não encontrada. Tarefas na lista " + tarefas.length})
        res.json(tarefa) 
});
app.post('/tarefas', (req, res) => {
    const novo = { id: tarefas.length + 1, ...req.body }
    tarefas.push(novo)
    res.status(201).json(novo)
})


app.listen(3000, () => console.log("Servidor em funcionamento")); // Quando subir no servidor ele aparece essa mensagem