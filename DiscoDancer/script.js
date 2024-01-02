const display = document.getElementsByTagName("BODY")[0];

let randomColor;

discoDancer();

async function discoDancer() {
    while (true) {
        randomColor = Math.floor(Math.random() * 16777215).toString(16);
        display.style.backgroundColor = "#" + randomColor;

        await sleep(150);
    }
}

function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
