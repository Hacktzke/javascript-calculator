"use strict";

const CONTAINER = document.querySelector(".container");
const EXITAREA = document.querySelector(".exit-area");
const EXITBTN = document.querySelector("#exit-btn");
const STARTBTN = document.querySelector("#start-calc-btn");
const BUTTONS = document.querySelectorAll(".btn");
const NUMBERS = document.querySelectorAll("#num");
const SYMBOLS = document.querySelectorAll("#symbol");
const EQUALS = document.querySelector("#equal");
const DECIMAL = document.querySelector("#decimal");
const DELETE = document.querySelector("#delete");
const CLEAR = document.querySelector("#clear");

let display= document.querySelector(".display");
let displayHist = document.querySelector(".display-history");
let calculation = [];

// FUNCTIONS: 

// Show previous equation

const showPreviousEq = () => {
    displayHist.textContent = calculation.join("");
}

// Round result of equation to max 5 decimal places

function roundToFive(num) {    
    return +(Math.round(num + "e+5")  + "e-5");
}

const removeFirstZeros = () => {
    while(display.textContent[0] === "0" && !display.textContent.includes(".")){
        display.textContent = display.textContent.substring(1);
    };
}

// Change displays function 

const changeDisplay = () => {
    CONTAINER.classList.toggle("hide");
    EXITBTN.classList.toggle("hide");
    EXITAREA.classList.toggle("hide");
    STARTBTN.classList.toggle("hide");
}

// Mouse click function 

function mouseStyle(){
    this.classList.toggle("btn-change-style-click");
}

//  Adding numbers function

function addNum() {
    for(let sym of SYMBOLS) {
        if(display.textContent.includes(sym.textContent)){
            calculation.push(display.textContent);
            showPreviousEq();
            display.textContent = "";
        }
    }
    display.textContent += this.textContent;
    for (let sym of SYMBOLS){
        sym.disabled = false;
    }
    }

// Adding symbols function 

function addSymbol() {  
    removeFirstZeros();
    calculation.push(display.textContent);
    showPreviousEq();
    DECIMAL.disabled = false;
    display.textContent = this.textContent;
    for(let sym of SYMBOLS){
        sym.disabled = true;
    }
    SYMBOLS[3].disabled = false;
    if(calculation[calculation.length -1] === "-") {
        SYMBOLS[3].disabled = true;
    }
}

// Add decimal function

function addDecimal() {
    removeFirstZeros();
    console.log(display.textContent)
    for(let sym of SYMBOLS) {
        if(display.textContent === sym.textContent){
            calculation.push(display.textContent);
            showPreviousEq();
            display.textContent = "";
        }
    }

    if (!display.textContent.includes(".")){
            DECIMAL.disabled = true;
            display.textContent += this.textContent;
        }
}

// Calculate display function

const calcDisplay = () => {
    
    try {
        removeFirstZeros();
        calculation.push(display.textContent);
        showPreviousEq();
        let result = eval(calculation.join(""));
        result = roundToFive(result);
        display.textContent = result;
        calculation = [];
    }
    catch {
        display.textContent = "ERROR";
        setTimeout(() => {
            clearDisplay();
        },2000)
        
    }
}

const deleteChar = () => {
    display.textContent = display.textContent.slice(0,-1);
    let last = display.textContent.charAt(display.textContent.length - 1);
    if (last === ".") {
        DECIMAL.disabled = true;
    }
    else {
        DECIMAL.disabled = false;
    }
    for (let sym of SYMBOLS){
        sym.disabled = false;
    }    
    for (let sym of SYMBOLS){
        // sym.disabled = false;
        if (sym.textContent === last){
            for(let sym of SYMBOLS){
            sym.disabled = true;
            }
        }
    }    
};

const clearDisplay = () => {
    display.textContent = "";
    displayHist.textContent = "";
    calculation = [];
    DECIMAL.disabled = false;
    for (let sym of SYMBOLS){
        sym.disabled = false;
    }
}

// EVENT LISTENERS:

EXITBTN.addEventListener("click", changeDisplay);
STARTBTN.addEventListener("click", changeDisplay);

// Number Event Listener

for ( let num of NUMBERS) {
    num.addEventListener("click", addNum);
}

// Symbol Event Listener

for ( let sym of SYMBOLS) {
    sym.addEventListener("click", addSymbol);
}

// Decimal Event Listener

DECIMAL.addEventListener("click",addDecimal);

// Backspace Event Listener

DELETE.addEventListener("click",deleteChar);

// "C" Event Listener

CLEAR.addEventListener("click", clearDisplay);

// "=" Event Listener

EQUALS.addEventListener("click", calcDisplay);

// Mouse Click Listeners

for (let btn of BUTTONS) {
    btn.addEventListener("mousedown", mouseStyle);
    btn.addEventListener("mouseup", mouseStyle);
}

// Mouse Hover Event Handlers

for (let btn of BUTTONS){
    btn.onmouseover= function(){btn.classList.add("btn-change-style-hover")};
    btn.onmouseout= function(){btn.classList.remove("btn-change-style-hover")};
}

// Keyboard Event Listener

window.addEventListener("keydown", function(e){
    if (Number(e.key) || e.key === "0"){
        display.textContent += e.key;
    }
    else {
        switch (e.key) {
            case "/":
                display.textContent += e.key;
                break;
            case "*":
                display.textContent += e.key;
                break;
            case "-":
                display.textContent += e.key;
                break;
            case "+":
                display.textContent += e.key;
                break;
            case "%":
                display.textContent += e.key;
                break;
            case ".":
                display.textContent += e.key;
                break;
            case "=":
                calcDisplay();
                break;
            case "Enter":
                calcDisplay();
                    break;
            case "Backspace":
                deleteChar();
                break;
            case "c":
                clearDisplay();
                break;
        }
    }
});