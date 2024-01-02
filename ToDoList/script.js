const itemInput = document.getElementById("itemInput");
const add = document.getElementById("add");
const items = document.getElementById("items");
const template = document.getElementById("template");

let list = [];

addItem();

add.addEventListener("click", () => {
    let item = itemInput.value;

    if (item != "") {
        list.push({
            item: item,
            checkbox: false,
        });
    }

    setList();
    addItem();
    itemInput.value = "";
});

function getList() {
    list = JSON.parse(localStorage.getItem("list")) || [];
}

function setList() {
    localStorage.setItem("list", JSON.stringify(list));
}

function addItem() {
    getList();
    items.innerHTML = "";

    for (let i of list) {
        let item = template.content.cloneNode(true);
        let itemDescription = item.getElementById("itemDescription");
        let checkboxInput = item.getElementById("checkboxInput");
        let remove = item.getElementById("remove");

        itemDescription.innerHTML = i.item;
        checkboxInput.checked = i.checkbox;

        checkboxInput.addEventListener("click", () => {
            i.checkbox = checkboxInput.checked;
            setList();
        });

        remove.addEventListener("click", () => {
            let index = list.indexOf(i);
            list.splice(index, 1);
            setList();
            addItem();
        });

        items.appendChild(item);
    }
}
