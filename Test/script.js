function btn() {
    let o1 = {
        id: 10,
        name: "Jubayer",
    };

    let o2 = {
        id: 20,
        name: "Ridita",
    };

    let a = [o1, o2];

    // localStorage.setItem("info", JSON.stringify(a));

    console.log(JSON.parse(localStorage.getItem("info")).at(1).name);
}
