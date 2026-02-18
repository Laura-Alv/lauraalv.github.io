let count = 0;

function updateCounter() {
    const counter = document.getElementById("counter");
    if (!counter) return;
    counter.textContent = count;
}

function tickUp() {
    count += 1;
    updateCounter();
}

function tickDown() {
    count -= 1;
    updateCounter();
}

function runForLoop() {
    const result = document.getElementById("forLoopResult");
    if (!result) return;

    const numbers = [];
    for (let i = 0; i <= count; i += 1) {
        numbers.push(i);
    }

    result.textContent = numbers.join(", ");
}

function showOddNumbers() {
    const result = document.getElementById("oddNumberResult");
    if (!result) return;

    const odds = [];
    for (let i = 1; i <= count; i += 1) {
        if (i % 2 !== 0) {
            odds.push(i);
        }
    }

    result.textContent = odds.join(", ");
}

function addMultiplesToArray() {
    const multiples = [];

    for (let i = count; i >= 5; i -= 1) {
        if (i % 5 === 0) {
            multiples.push(i);
        }
    }

    console.log(multiples);
}

function printCarObject() {
    const carType = document.getElementById("carType");
    const carMPG = document.getElementById("carMPG");
    const carColor = document.getElementById("carColor");
    if (!carType || !carMPG || !carColor) return;

    const carObject = {
        cType: carType.value.trim(),
        cMPG: carMPG.value.trim(),
        cColor: carColor.value.trim()
    };

    console.log(carObject);
}

function loadCar(carNumber) {
    const carType = document.getElementById("carType");
    const carMPG = document.getElementById("carMPG");
    const carColor = document.getElementById("carColor");
    if (!carType || !carMPG || !carColor) return;

    const carLookup = {
        1: typeof carObject1 !== "undefined" ? carObject1 : undefined,
        2: typeof carObject2 !== "undefined" ? carObject2 : undefined,
        3: typeof carObject3 !== "undefined" ? carObject3 : undefined
    };

    const car = carLookup[carNumber];
    if (!car) return;

    carType.value = car.cType;
    carMPG.value = car.cMPG;
    carColor.value = car.cColor;
}

function changeColor(colorNumber) {
    const paragraph = document.getElementById("styleParagraph");
    if (!paragraph) return;

    const colorLookup = {
        1: "red",
        2: "green",
        3: "blue"
    };

    const chosenColor = colorLookup[colorNumber];
    if (!chosenColor) return;

    paragraph.style.color = chosenColor;
}
