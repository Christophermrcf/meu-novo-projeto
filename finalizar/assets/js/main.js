const adicionar = document.querySelector('#form-adic');
const editar = document.querySelector('#form-edit');
const editTexto = document.querySelector('#edit-text');
const btnCancelEdit = document.querySelector('#btn-edit-x');
const lista = document.querySelector('#lista');
const okList = document.querySelector('.form-concluidas');
const tarefaText = document.querySelector('#objetivo')

let oldInputValue;

// funções

const updateItem = (text) => {

    const items = document.querySelectorAll(".item")

    items.forEach((item) => {
 
        let itemTitle = item.querySelector("h3")

        if(itemTitle.innerText === oldInputValue) {
            itemTitle.innerText = text;
        }
    })
}

const saveList = (text) => {

    const item = document.createElement("div");
    item.classList.add("item");

    const itemTexto = document.createElement("h3");
    itemTexto.innerText = text;
    item.appendChild(itemTexto);

    const btnFeito = document.createElement("button");
    btnFeito.classList.add("btn-feito");
    btnFeito.innerHTML = '<i class="fa-solid fa-check"></i>';
    item.appendChild(btnFeito);

    const btnEdit = document.createElement("button");
    btnEdit.classList.add("btn-edit");
    btnEdit.innerHTML = '<i class="fa-solid fa-edit"></i>';
    item.appendChild(btnEdit);

    const btnRemove = document.createElement("button");
    btnRemove.classList.add("btn-remove");
    btnRemove.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    item.appendChild(btnRemove);

    lista.appendChild(item);

    tarefaText.value = "";
    tarefaText.focus();
}

const toggleForms = () => {
    editar.classList.toggle("hide");
    adicionar.classList.toggle("hide");
    lista.classList.toggle("hide")
}

//Eventos
adicionar.addEventListener("submit", (e) => {
    e.preventDefault();

    const tarefaTextValue = tarefaText.value

    if (tarefaTextValue) {
        saveList(tarefaTextValue)
    }
})

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let itemTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        itemTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("btn-feito")) {
        parentEl.classList.toggle("done")
    }

    if (targetEl.classList.contains("btn-remove")) {
        parentEl.remove()
    }

    if (targetEl.classList.contains("btn-edit")) {
        toggleForms()

        editTexto.value = itemTitle;
        oldInputValue = itemTitle;
    }
})

btnCancelEdit.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
})

editar.addEventListener("submit", (e) => {

    e.preventDefault();

    const editInputValue = editTexto.value;

    if (editInputValue) {
        updateItem(editInputValue);
    }

    toggleForms();
})