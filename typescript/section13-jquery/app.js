"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jquery");
console.log("Hola mundo");
$(document).ready(function () {
    $('h1').text('Hola desde typescript');
    $('p').text('Hola desde este parrafo')
});

$('#botAlerta').on("click", function(){
    alert('Hola mundo desde typescript')
})