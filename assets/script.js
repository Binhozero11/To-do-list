const listElement = document.querySelector("#app ul");
const inputElement = document.querySelector("#app form input");
const buttonElement = document.querySelector("#app button");
const form = document.querySelector("#app form")

let tarefas = JSON.parse(localStorage.getItem("@listaTarefas")) || [];

function renderTarefas() {
    listElement.innerHTML = '';

    tarefas.map((toDo) => {
        let liElement = document.createElement("li");
        let textareaElement = document.createElement("textarea");
        let tarefaText = document.createTextNode(toDo);
        
    
        textareaElement.setAttribute("maxLength", 600);
        textareaElement.setAttribute("disabled", true);

        let linkElement = document.createElement("button");
        linkElement.setAttribute("class", "excluir");

        let secondLinkElement = document.createElement("button");
        secondLinkElement.setAttribute("class", "editar");
        secondLinkElement.setAttribute("type", "submit");

        let linkText = document.createTextNode("Excluir");
        linkElement.appendChild(linkText)

        let secondLinkText = document.createTextNode("Editar");
        secondLinkElement.appendChild(secondLinkText)

        let posicao = tarefas.indexOf(toDo)

        linkElement.setAttribute("onclick", `deletarTarefa(${posicao})`);
        secondLinkElement.setAttribute("onclick", `editarTexto(event)`);

        textareaElement.appendChild(tarefaText);
        liElement.appendChild(textareaElement);
        liElement.appendChild(secondLinkElement);
        liElement.appendChild(linkElement);
        listElement.appendChild(liElement);

        autoResize({ target: textareaElement })
    })
}

renderTarefas()

window.addEventListener('resize', (e) => {
    if (e.target.innerWidth = 1200) {
        renderTarefas()
        return
    }
    if (e.target.innerWidth = 768) {
        renderTarefas()
        return
    }if (e.target.innerWidth = 480) {
        renderTarefas()
        return
    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    addTasks()
    inputElement.value = ''
})

function textoExisteNaLista() {
    for (var i = 0; i < tarefas.length; i++) {
        if (tarefas[i] === inputElement.value) {
            return true;
        }
    }
    return false;
}

function animacaoDoBotao() {
    const animationbuttonForm = document.querySelector("form div button")

    animationbuttonForm.classList.add("tarefaVazia")

    animationbuttonForm.addEventListener("animationend", () => {
        animationbuttonForm.classList.remove("tarefaVazia")
    })
}

function animacaoTextoJaExistente() {
    const animationbuttonForm = document.querySelector("form div button")
    const mensagemDeErro = document.getElementById("mensagemErro")

    animationbuttonForm.classList.add("tarefaVazia")
    mensagemDeErro.style.display = "block"

    animationbuttonForm.addEventListener("animationend", () => {
        animationbuttonForm.classList.remove("tarefaVazia")
        mensagemDeErro.style.display = "none"
    })
}


function addTasks() {
    if(inputElement.value === '') {
        animacaoDoBotao()
        return false;
    }

    if (inputElement.value.startsWith(' ')) {
        return;
    }

    if (textoExisteNaLista() === true) {
        animacaoTextoJaExistente()
        return false;
    }

    let novaTarefa = inputElement.value;

    tarefas.push(novaTarefa);
    
    renderTarefas();
    
    const li = document.querySelector("ul li:last-child");
    
    li.classList.add("animacaoDeEntrada")
    li.addEventListener("animationend", () => {
        li.classList.remove("animacaoDeEntrada")
        })

    salvarDados();
    
}

function deletarTarefa(posicao) {
    const li = document.querySelectorAll("ul li")[posicao];

    li.classList.add("animacaoDeSaida");

    li.addEventListener("animationend", () => {
        tarefas.splice(posicao, 1)
        
        renderTarefas()
        salvarDados()
    })

}

function salvarDados() {
    localStorage.setItem("@listaTarefas", JSON.stringify(tarefas))
}

function editarTexto(event) {
    const li = event.target.parentNode;
    const filhosDaLi = li.childNodes;
    
    if(event.target.classList.contains("editando")){
        event.target.classList.remove("editando");
        event.target.innerHTML = "Editar";

        filhosDaLi[0].setAttribute("disabled", true)

        const index = Array.from(li.parentNode.children).indexOf(li)

        tarefas[index] = filhosDaLi[0].value;
        salvarDados()
        renderTarefas()

    } else {
        event.target.classList.add("editando")
        event.target.innerHTML = "Salvar"

        filhosDaLi[0].removeAttribute("disabled");
        filhosDaLi[0].focus();

        moveCursor(filhosDaLi[0])
    }
}

function autoResize(event) {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.minHeight = textarea.scrollHeight + "px";
}

function moveCursor(event) {
    const textarea = event;
    const texto = textarea.textContent;

    textarea.setSelectionRange(texto.length, texto.length);
}



/*

    4-- a animacao de saida so pode ser clicada uma por vez
    5-- responsividade
*/
