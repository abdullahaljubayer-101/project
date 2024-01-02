const monitor01 = document.getElementById("monitor-01");
const monitor02 = document.getElementById("monitor-02");

let data = [];
let nums = [];

monitor01.innerHTML = "";
monitor02.innerHTML = "";

function main(element) {
    if (element.id == "C") {
        data = [];
        nums = [];
        monitor01.innerHTML = "";
        monitor02.innerHTML = "";
    } else if (element.id == "=") {
        sortData();
        monitor01.innerHTML = displayData();
        monitor02.innerHTML = claculation();
    } else {
        data.push(element.id);
        monitor02.innerHTML = displayData();
    }
}

function displayData() {
    let str = "";

    for (let i = 0; i < data.length; i++) {
        str += data[i];
    }

    return str;
}

function sortData() {
    let num = "";

    for (let i = 0; i < data.length; i++) {
        if (data[i] >= "0" && data[i] <= "9") {
            num += data[i];
        } else {
            if (num != "") nums.push(num);
            nums.push(data[i]);
            num = "";
        }
        if (data.length - 1 == i) {
            if (num != "") nums.push(num);
            num = "";
        }
    }
}

function claculation() {
    while (findFB() != -1 && findLB() != -1) {
        mulDivCalculationWithB();
        addSubCalculationWithB();
        nums.splice(findLB(), 1);
        nums.splice(findFB(), 1);
    }

    mulDivCalculation();
    addSubCalculation();

    return nums[0];
}

function mulDivCalculationWithB() {
    let fbIndex = findFB();
    let lbIndex = findLB();
    let x;

    while (true) {
        let flag = true;

        for (let i = fbIndex; i <= lbIndex; i++) {
            if (nums[i] == "*") {
                x = Number(nums[i - 1]) * Number(nums[i + 1]);
                nums.splice(nums.indexOf(nums[i - 1]), 3, String(x));
                flag = false;
                break;
            }
            if (nums[i] == "/") {
                x = Number(nums[i - 1]) / Number(nums[i + 1]);
                nums.splice(nums.indexOf(nums[i - 1]), 3, String(x));
                flag = false;
                break;
            }
        }

        fbIndex = findFB();
        lbIndex = findLB();

        if (flag) {
            break;
        }
    }
}

function addSubCalculationWithB() {
    let fbIndex = findFB();
    let lbIndex = findLB();
    let x;

    while (true) {
        let flag = true;

        for (let i = fbIndex; i <= lbIndex; i++) {
            if (nums[i] == "+") {
                x = Number(nums[i - 1]) + Number(nums[i + 1]);
                nums.splice(nums.indexOf(nums[i - 1]), 3, String(x));
                flag = false;
                break;
            }
            if (nums[i] == "-") {
                x = Number(nums[i - 1]) - Number(nums[i + 1]);
                nums.splice(nums.indexOf(nums[i - 1]), 3, String(x));
                flag = false;
                break;
            }
        }

        fbIndex = findFB();
        lbIndex = findLB();

        if (flag) {
            break;
        }
    }
}

function mulDivCalculation() {
    let x;

    while (true) {
        let flag = true;

        for (let i = 0; i < nums.length; i++) {
            if (nums[i] == "*") {
                x = Number(nums[i - 1]) * Number(nums[i + 1]);
                nums.splice(nums.indexOf(nums[i - 1]), 3, String(x));
                flag = false;
                break;
            }
            if (nums[i] == "/") {
                x = Number(nums[i - 1]) / Number(nums[i + 1]);
                nums.splice(nums.indexOf(nums[i - 1]), 3, String(x));
                flag = false;
                break;
            }
        }

        if (flag) {
            break;
        }
    }
}

function addSubCalculation() {
    let x;

    while (true) {
        let flag = true;

        for (let i = 0; i < nums.length; i++) {
            if (nums[i] == "+") {
                x = Number(nums[i - 1]) + Number(nums[i + 1]);
                nums.splice(nums.indexOf(nums[i - 1]), 3, String(x));
                flag = false;
                break;
            }
            if (nums[i] == "-") {
                x = Number(nums[i - 1]) - Number(nums[i + 1]);
                nums.splice(nums.indexOf(nums[i - 1]), 3, String(x));
                flag = false;
                break;
            }
        }

        if (flag) {
            break;
        }
    }
}

function findFB() {
    let i;
    let pos = -1;
    for (i = 0; i < nums.length; i++) {
        if (nums[i] == "(") {
            pos = i;
        }
    }
    return pos;
}

function findLB() {
    let i = findFB();
    if (i == -1) {
        return -1;
    }
    for (; i < nums.length; i++) {
        if (nums[i] == ")") {
            return i;
        }
    }
    return -1;
}
