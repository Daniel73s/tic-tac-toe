//esto sigifica que con el que va empezar es la X
var opSymb = true;
//haciendo referencia al h1 que contiene el turno actual
var turno = document.querySelector('#turno');
//TablaVirtual
var matriz = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

//agregar simbolo a la tabla virtual
// const agregarATabla = (row, cell, simbol) => {
//     matriz[row][cell] = simbol;
//     console.log(matriz);
// }

//resetear tabla virtual y html
const reset = () => {
    matriz = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    for (var i = 0; i < matriz.length; i++) {
        for (var j = 0; j < matriz[i].length; j++) {
            const h1 = document.getElementById(`dato${i}${j}`);
            h1.textContent = "";
        }
    }
}

//verificando si en la etiqueta h1 ya existe un valor
const verificarH1 = (element, simbol, row, cell) => {
    if (element.textContent == "") {
        element.innerText = simbol;
        matriz[row][cell] = simbol;
        opSymb = !opSymb
        if(opSymb){
            turno.textContent = "X";
        }else{
            turno.textContent = "0";
        }
    }
}




//****************************************************** */
//*********************VERIFICAR GANADOR******************/
//******************************************************* */
const verificarGanador = (simbol) => {
    let valor = "";

    // verificando ganador en las lineas horizontales
    for (var i = 0; i < matriz.length; i++) {
        for (var j = 0; j < matriz[i].length; j++) {
            //concatenamos los valores de la fila horizontal para verificar si existe algun ganador
            valor = valor + matriz[i][j];
        }
        // verificamos si hay un ganador
        if (valor == "XXX" || valor == "000") {
            Swal.fire('¡Ganador!', `${valor.charAt(0)}`, 'success');
            reset()
        }
        //si no existe ganador se resetea la variable valor para continual con la fila o columna siguiente
        valor = ""
    }

    //verificando ganador en las lineas verticales 
    for (var b = 0; b < matriz.length; b++) {
        for (var a = 0; a < matriz[b].length; a++) {
            //concatenamos la fila vertical para verificar si hay algun ganador
            valor = valor + matriz[a][b];
        }
        //verificamos si existe un ganador 
        if (valor == "XXX" || valor == "000") {
            Swal.fire('¡Ganador!', `${valor.charAt(0)}`, 'success');
            reset()
        }
        //si no existe ganador se resetea la variable valor para continual con la fila o columna siguiente
        valor = ""
    }

    //verificar si existe algun ganador en la diagonal primaria
    let diagonal_primaria="";
    for (var a = 0; a < matriz.length; a++) {
        for (var b = 0; b < matriz[a].length; b++) {
            //concatenamos los valores de la diagonal primaria
            if(a==b){
                diagonal_primaria = diagonal_primaria + matriz[a][b];
            }
        }
    }
    //verificamos si existe un ganador en la diagonal primaria 
    if (diagonal_primaria == "XXX" || diagonal_primaria == "000") {
        Swal.fire('¡Ganador!', `${diagonal_primaria.charAt(0)}`, 'success');
        reset()
    }

    let diagonal_secundaria=""
        //verificar si existe algun ganador en la diagonal primaria
        for (var a = 0; a < matriz.length; a++) {
            for (var b = 0; b < matriz[a].length; b++) {
                //concatenamos los valores de la diagonal primaria
                if(a+b==2){
                    diagonal_secundaria = diagonal_secundaria + matriz[a][b];
                }
            }
        }
        //verificamos si existe un ganador en la diagonal primaria 
        if (diagonal_secundaria == "XXX" || diagonal_secundaria == "000") {
            Swal.fire('¡Ganador!', `${diagonal_secundaria.charAt(0)}`, 'success');
            reset()
        }
}





const jugar = (row, cell) => {
    const h1 = document.getElementById(`dato${row}${cell}`);
    if (opSymb) {
        verificarH1(h1, "X", row, cell);
        verificarGanador('X');
    } else {
       
        verificarH1(h1, "0", row, cell);
        verificarGanador('0');
    }
}

