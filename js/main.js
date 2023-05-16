//esto sigifica que con el que va empezar es la X
var opSymb = true;

//TablaVirtual
var matriz = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

const agregarATabla = (row, cell, simbol) => {
    matriz[row][cell] = simbol;
    console.log(matriz);
}

//resetear tabla virtual y html
const reset=()=>{
    matriz = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    for (var i = 0; i < matriz.length; i++) {
        for (var j = 0; j < matriz[i].length; j++) {
            const h1=document.getElementById(`dato${i}${j}`);
            h1.textContent="";
        }
    }
}

//verificando si en la etiqueta h1 ya existe un valor
const verificarH1 = (element, simbol) => {
    if (element.textContent == "") {
        element.innerText = simbol;
        opSymb = !opSymb
    }
}

//verificar ganador 
const verificarGanador = (simbol) => {
    let valor = "";
    // verificando ganador en las lineas horizontales
    for (var i = 0; i < matriz.length; i++) {
        for (var j = 0; j < matriz[i].length; j++) {
            valor = [valor + matriz[i][j]];
        }
        if(valor=="XXX" || valor=="000"){
            console.log('ganador');
            reset()
        }
        valor=""
    }

    //verificando ganador en las lineas verticales 
    for (var b = 0; b < matriz.length; b++) {
        for (var a = 0; a < matriz[b].length; a++) {
            valor = [valor + matriz[a][b]]; 
        }
        if(valor=="XXX" || valor=="000"){
            console.log('ganador');
            reset()
        }
        valor=""
    }
}





const jugar = (row, cell) => {
    const h1 = document.getElementById(`dato${row}${cell}`);
    if (opSymb) {
        verificarH1(h1, "X");
        agregarATabla(row, cell, 'X');
        verificarGanador('X')
    } else {
        verificarH1(h1, "0");
        agregarATabla(row, cell, '0');
        verificarGanador('0')
    }
}

