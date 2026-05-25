
let count = 0;

const countDisplay = document.getElementById("count");
const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");
const resetButton = document.getElementById("reset");
const darkModeButton = document.getElementById("dark-mode");
const IncreaseBy5 = document.getElementById("+5");
const DecreaseBy5 = document.getElementById("-5");

function updateCount() {
    countDisplay.textContent = count;

    if (count > 0) {
        countDisplay.style.color = "green";
    } else if (count <0) {
        countDisplay.style.color = "red";
    } else {
        countDisplay.style.color = "black";
    }

    countDisplay.classList.add("animate");

    setTimeout(() => {
        countDisplay.classList.remove("animate");
    }, 100);
}

increaseButton.addEventListener("click", () => {
    count++;
    updateCount();
});

decreaseButton.addEventListener("click", () => {
    if(count>0){
    count--;
    updateCount();}
});

resetButton.addEventListener("click", () => {
    count = 0;
    updateCount();
});

IncreaseBy5.addEventListener("click", () => {
    count = count + 5;
    updateCount();
});

DecreaseBy5.addEventListener("click", () => {
    if(count > 0){
    count = count - 5;
    updateCount();}
});


document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowUp") {
        count++;
        updateCount();
    }

    if (event.key === "ArrowDown") {
        if(count>0){
        count--;
        updateCount();}
    }

    if (event.key === "r") {
        count = 0;
        updateCount();
    }
});

darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});