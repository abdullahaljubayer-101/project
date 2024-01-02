const notes = document.getElementById("notes");
const add = document.getElementById("add");
const template = document.getElementById("template");

let notesDB = [];

printNode();

function setNote() {
    localStorage.setItem("note", JSON.stringify(notesDB));
}

function getNote() {
    notesDB = JSON.parse(localStorage.getItem("note")) || [];
}

function printNode() {
    getNote();

    notes.innerHTML = "";

    for (let i of notesDB) {
        const note = template.content.cloneNode(true).getElementById("note");
        note.innerHTML = i.content;

        note.addEventListener("change", () => {
            i.content = note.value;
            setNote();
            printNode();
        });

        note.addEventListener("dblclick", () => {
            notesDB.splice(notesDB.indexOf(i), 1);
            setNote();
            printNode();
        });

        notes.appendChild(note);
    }
}

add.addEventListener("click", () => {
    notesDB.push({
        content: "",
    });

    setNote();
    printNode();
});
