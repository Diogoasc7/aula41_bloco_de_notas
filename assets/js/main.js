const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li;
}
/*
O que faz? Cria e retorna um elemento <li> que será usado para exibir cada tarefa na lista.
Por que usar? Encapsula a criação de elementos <li>, melhorando a legibilidade e reutilização do código.
*/

inputTarefa.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});
/*
O que faz? Escuta o evento de tecla pressionada no campo de entrada e verifica se a tecla pressionada é o Enter (keyCode === 13). Se for, cria uma nova tarefa com o texto digitado.
Comandos:
    e.keyCode === 13: Verifica se a tecla pressionada é o Enter.
    if (!inputTarefa.value) return;: Impede a criação de tarefas vazias.
    criaTarefa(inputTarefa.value): Chama a função para criar a tarefa.
*/

function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}
/*
O que faz? Limpa o campo de entrada e foca nele novamente, facilitando a adição de novas tarefas.
Por que usar? Melhora a experiência do usuário, permitindo continuar digitando sem precisar clicar no campo novamente.
*/

function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(botaoApagar);
}
/*
O que faz? Cria um botão "Apagar" e o adiciona ao elemento <li>.
Comandos:
    li.innerText += ' ';: Adiciona um espaço ao final do texto da tarefa antes de incluir o botão.
    botaoApagar.setAttribute(...): Define atributos como classe e título para o botão.
    li.appendChild(botaoApagar): Adiciona o botão como filho do elemento <li>.
*/

function criaTarefa(textoInput){
    const li = criaLi();
    li.innerHTML = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}
/*
O que faz? Cria uma tarefa na lista com o texto fornecido e adiciona o botão "Apagar".
Comandos:
    const li = criaLi();: Cria um elemento <li>.
    li.innerHTML = textoInput;: Define o texto da tarefa.
    tarefas.appendChild(li);: Adiciona o <li> à lista de tarefas no DOM.
    limpaInput();: Limpa e foca o campo de entrada.
    criaBotaoApagar(li);: Adiciona o botão "Apagar".
    salvarTarefas();: Atualiza a lista de tarefas no localStorage.
*/

btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value)
});
/*
O que faz? Adiciona uma nova tarefa ao clicar no botão "Adicionar".
Por que usar? Oferece uma alternativa ao Enter para criar tarefas.
*/

document.addEventListener('click', function(e){
    const el = e.target;
    
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
});
/*
O que faz? Escuta cliques na página e verifica se o clique foi no botão "Apagar". Se sim, remove a tarefa correspondente.
Comandos:
    if (el.classList.contains('apagar')): Verifica se o elemento clicado tem a classe "apagar".
    el.parentElement.remove(): Remove o elemento pai do botão (o <li> da tarefa).
    salvarTarefas(): Atualiza a lista de tarefas no localStorage.
*/

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}
/*
O que faz? Salva a lista de tarefas no localStorage como uma string JSON.
Comandos:
    tarefas.querySelectorAll('li'): Obtém todas as tarefas da lista.
    tarefaTexto.replace('Apagar', '').trim(): Remove o texto "Apagar" e espaços extras.
    JSON.stringify(listaDeTarefas): Converte a lista de tarefas em uma string JSON.
    localStorage.setItem('tarefas', tarefasJSON): Salva no localStorage.
*/

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    
    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}
adicionaTarefasSalvas();
/*
O que faz? Recupera tarefas salvas no localStorage e as adiciona à lista ao carregar a página.
Comandos:
    localStorage.getItem('tarefas'): Recupera as tarefas salvas.
    JSON.parse(tarefas): Converte a string JSON de volta em uma lista.
    for (let tarefa of listaDeTarefas): Adiciona cada tarefa à lista exibida.
*/