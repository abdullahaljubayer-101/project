const usernameReg = document.getElementById("usernameReg");
const passwordReg = document.getElementById("passwordReg");
const register = document.getElementById("register");
const usernameLog = document.getElementById("usernameLog");
const passwordLog = document.getElementById("passwordLog");
const login = document.getElementById("login");
const clear = document.getElementById("clear");

let usernameDB = [];
let passwordDB = [];

register.addEventListener("click", () => {
    let username = usernameReg.value;
    let password = passwordReg.value;

    if (username != "" && password != "") {
        usernameDB.push(username);
        passwordDB.push(password);

        localStorage.setItem("username", JSON.stringify(usernameDB));
        localStorage.setItem("password", JSON.stringify(passwordDB));

        alert("Registretion Sucssesfull!");
    } else {
        alert("Fillup the from!");
    }

    usernameReg.value = "";
    passwordReg.value = "";
});

login.addEventListener("click", () => {
    let username = usernameLog.value;
    let password = passwordLog.value;

    if (username != "" && password != "") {
        let usernameCheker = false;
        let passwordCheker = false;

        usernameDB = JSON.parse(localStorage.getItem("username"));
        passwordDB = JSON.parse(localStorage.getItem("password"));

        for (let i of usernameDB) {
            if (i == username) {
                usernameCheker = true;
                break;
            }
        }

        for (let i of passwordDB) {
            if (i == password) {
                passwordCheker = true;
                break;
            }
        }

        if (usernameCheker && passwordCheker) {
            alert("Login Sucssesfull!");
        } else {
            alert("Username of Password Wrong!");
        }
    } else {
        alert("Fillup the from!");
    }

    usernameLog.value = "";
    passwordLog.value = "";
});

clear.addEventListener("click", () => {
    localStorage.clear();
    alert("Database Cleared!");
});
