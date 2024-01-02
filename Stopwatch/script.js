const projectTitle = document.getElementById("projectTitle");
const display = document.getElementById("display");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const template = document.getElementById("template");
const projectList = document.getElementById("projectList");
const inputProject = document.getElementById("inputProject");
const addProject = document.getElementById("addProject");

let hor = 0;
let min = 0;
let sec = 0;
let flag = true;
let play = true;
let projectListDB = [];
let flagName;

getProjectListDB();
printProject();

async function startF() {
    flag = true;
    if (play) {
        play = false;
        while (flag) {
            display.innerHTML = formate(hor) + ":" + formate(min) + ":" + formate(sec);

            if (sec == 59) {
                min++;
                sec = 0;
            } else {
                sec++;
            }

            if (min == 60) {
                hor++;
                min = 0;
                sec = 0;
            }

            await sleep(1000);
        }
    }
}

function stopF() {
    flag = false;
    play = true;

    updateTime();
}

function resetF() {
    flag = false;
    play = true;
    hor = 0;
    min = 0;
    sec = 0;
    display.innerHTML = formate(hor) + ":" + formate(min) + ":" + formate(sec);

    updateTime();
}

function addProjectF() {
    let projectName = inputProject.value;
    if (projectName != "") {
        projectListDB.push({
            projectName: projectName,
            hor: 0,
            min: 0,
            sec: 0,
        });
        setProjectListDB();

        inputProject.value = "";
    }
    printProject();
}

function printProject() {
    projectList.innerHTML = "";

    for (let i of projectListDB) {
        const projectColon = template.content.cloneNode(true);
        const project = projectColon.querySelector("#project");

        project.innerHTML = i.projectName;

        project.addEventListener("click", () => {
            projectTitle.innerHTML = project.innerHTML;

            flagName = i.projectName;

            hor = i.hor;
            min = i.min;
            sec = i.sec;
            display.innerHTML = formate(hor) + ":" + formate(min) + ":" + formate(sec);
        });

        project.addEventListener("dblclick", () => {
            projectListDB.splice(projectListDB.indexOf(i), 1);
            setProjectListDB();
            printProject();
            projectTitle.innerHTML = "";
        });

        projectList.appendChild(projectColon);
    }
}

function updateTime() {
    for (let i of projectListDB) {
        if (flagName == i.projectName) {
            i.hor = hor;
            i.min = min;
            i.sec = sec;
            setProjectListDB();
            return;
        }
    }
}

function setProjectListDB() {
    localStorage.setItem("projectListDB", JSON.stringify(projectListDB));
}

function getProjectListDB() {
    if (JSON.parse(localStorage.getItem("projectListDB")) == null) {
        setProjectListDB();
    } else {
        projectListDB = JSON.parse(localStorage.getItem("projectListDB"));
    }
}

function formate(x) {
    return x < 10 ? "0" + x : x;
}

function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

window.onbeforeunload = function () {
    updateTime();
};
