"use strict";

const $ = selector => document.querySelector(selector);

const flipText = () => {
    const h1 = $("h1");
    let splitString = h1.innerHTML.split("").reverse().join("");
    h1.innerHTML = splitString;
};

document.addEventListener("DOMContentLoaded", () => {
    $("h1").addEventListener("click", flipText);
});