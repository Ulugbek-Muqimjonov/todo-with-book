const elForm = document.querySelector(".hero__form");
const elList = document.querySelector(".hero__list")
const btnWrap = document.querySelector(".site-header__btn-wrap");
const todos = [];
let counter = 0;
let falsecounter = 0;
elForm.addEventListener("submit", evt => {
    evt.preventDefault();
    todos.push({
        id: todos.length ? todos.at(-1).id + 1 : 1,
        text: elForm.children[0].value.trim(),
        iscompalte: false
    })
    elForm.children[0].value = ""
    counter++
    btnWrap.children[0].children[0].innerHTML = counter
    render(todos,elList)
})

elList.addEventListener("click", evt => {
    if (evt.target.matches(".hero__todo-check-inp")) {
        const checkeditem = todos.find(item => item.id == evt.target.dataset.id)
        checkeditem.iscompalte = !checkeditem.iscompalte

        const checked = todos.filter(item => item.iscompalte).length

        btnWrap.children[1].children[0].innerHTML = checked

        btnWrap.children[2].children[0].innerHTML = counter - checked

        render(todos, elList)
    }
    if (evt.target.matches(".hero__edit-btn")) {
        const newtext = prompt("yangi todoni kiriting: ")
        const edititem = todos.find(item => item.id == evt.target.dataset.id)
        edititem.text = newtext ? newtext:edititem.text
        render([...todos], elList)
        
    }
    if (evt.target.matches(".hero__del-btn")) {
        const delbtn = todos.findIndex(item => item.id == evt.target.dataset.id)
        todos.splice(delbtn,1)
        render([...todos], elList)
        
    }
})
btnWrap.addEventListener("click", evt => {
    if (evt.target.matches(".btn-all")) {
        render(todos,elList)
    }
    if (evt.target.matches(".btn-true")) {
        const checkeds = todos.filter(item => item.iscompalte)
        render(checkeds, elList)
    }
    if (evt.target.matches(".btn-false")) {
        const uncheckeds = todos.filter(item => !item.iscompalte)
        render(uncheckeds, elList)
    }
})
function render(arr, node) {
    node.innerHTML = "";
    arr.length ? arr.forEach(item => {
        const liElement = document.createElement("li")
        liElement.classList.add("hero__item,", "list-group-item", "d-flex", "align-items-center");

        const inpElement = document.createElement("input")
        inpElement.type = "checkbox";
        inpElement.classList.add("hero__todo-check-inp", "me-3");
        inpElement.dataset.id = item.id;
       

        const textElement = document.createElement("p")
        textElement.textContent = item.text;
        textElement.classList.add("hero__todo-text", "flex-grow-1", "m-0");        

        const editBtn = document.createElement("button")
        editBtn.textContent = "Edit"
        editBtn.dataset.id = item.id
        editBtn.classList.add("btn", "btn-warning", "me-3","hero__edit-btn");

        if (item.iscompalte) {
            inpElement.checked = true;
            textElement.classList.add("text-decoration-line-through")
        }
        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Delete";
        deleteBtn.dataset.id = item.id;
        deleteBtn.classList.add("btn", "btn-danger","hero__del-btn");

        liElement.append(inpElement,textElement, editBtn, deleteBtn)
        node.appendChild(liElement)
    }):`<li><h2 class="error">No todo :(</h2></li>`
}