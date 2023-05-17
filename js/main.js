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


//clase despintar
const despintar = (array) => {
    array.forEach(coords => {
        const celda = document.querySelector(`#celda${coords.i}${coords.j}`);
        celda.classList.remove("bg-primary", "text-light");
    });
}


//pintar ganador
//clases 
const pintar = (array) => {
    array.forEach(coords => {
        const celda = document.querySelector(`#celda${coords.i}${coords.j}`);
        celda.classList.add("bg-primary", "text-light")
    });

    setTimeout(() => {
        despintar(array)
    }, 1500);

}


//resetear tabla virtual y html
const reset = () => {
    opSymb=true;
    const h1=document.querySelector('#turno');
    h1.textContent="X"
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
        if (opSymb) {
            turno.textContent = "X";
        } else {
            turno.textContent = "0";
        }
    }
}




//****************************************************** */
//*********************VERIFICAR GANADOR******************/
//******************************************************* */
let coordenadas = [];
const verificarGanador = () => {
    let valor = "";
    // verificando ganador en las lineas horizontales
    for (var i = 0; i < matriz.length; i++) {
        for (var j = 0; j < matriz[i].length; j++) {
            //concatenamos los valores de la fila horizontal para verificar si existe algun ganador
            valor = valor + matriz[i][j];
            coordenadas.push({ i, j })
        }
        // verificamos si hay un ganador
        if (valor == "XXX" || valor == "000") {
            pintar(coordenadas);
            Swal.fire(
                {
                    position: 'center',
                    icon: 'success',
                    title: `Ganador ${valor.charAt(0)}`,
                    showConfirmButton: false,
                    timer: 1000
                }
            )
            setTimeout(() => {
                reset();
            }, 1500);
        }
        //si no existe ganador se resetea la variable valor para continual con la fila o columna siguiente
        valor = ""
        coordenadas = []
    }

    //verificando ganador en las lineas verticales 
    coordenadas=[];
    for (var b = 0; b < matriz.length; b++) {
        for (var a = 0; a < matriz[b].length; a++) {
            //concatenamos la fila vertical para verificar si hay algun ganador
            valor = valor + matriz[a][b];
            coordenadas.push({ i:a, j:b })
        }
        //verificamos si existe un ganador 
        if (valor == "XXX" || valor == "000") {
            pintar(coordenadas);
            Swal.fire(
                {
                    position: 'center',
                    icon: 'success',
                    title: `Ganador ${valor.charAt(0)}`,
                    showConfirmButton: false,
                    timer: 1000
                }
            )
            setTimeout(() => {
                reset();
            }, 1500);
        }
        //si no existe ganador se resetea la variable valor para continual con la fila o columna siguiente
        valor = ""
        coordenadas=[];
    }

    coordenadas=[];
    //verificar si existe algun ganador en la diagonal primaria
    let diagonal_primaria = "";
    for (var a = 0; a < matriz.length; a++) {
        for (var b = 0; b < matriz[a].length; b++) {
            //concatenamos los valores de la diagonal primaria
            if (a == b) {
                diagonal_primaria = diagonal_primaria + matriz[a][b];
                coordenadas.push({i:a,j:b});
            }
        }
    }
    //verificamos si existe un ganador en la diagonal primaria 
    if (diagonal_primaria == "XXX" || diagonal_primaria == "000") {
        pintar(coordenadas);
        Swal.fire(
            {
                position: 'center',
                icon: 'success',
                title: `Ganador ${diagonal_primaria.charAt(0)}`,
                showConfirmButton: false,
                timer: 1000
            }
        )
        setTimeout(() => {
            reset();
        }, 1500);
    }

    let diagonal_secundaria = ""
    coordenadas=[];
    //verificar si existe algun ganador en la diagonal secundaria
    for (var a = 0; a < matriz.length; a++) {
        for (var b = 0; b < matriz[a].length; b++) {
            //concatenamos los valores de la diagonal secundaria
            if (a + b == 2) {
                diagonal_secundaria = diagonal_secundaria + matriz[a][b];
                coordenadas.push({i:a,j:b});
            }
        }
    }
    //verificamos si existe un ganador en la diagonal  secundaria
    if (diagonal_secundaria == "XXX" || diagonal_secundaria == "000") {
        console.log('pintando ganador ',coordenadas)
        pintar(coordenadas);
        Swal.fire(
            {
                position: 'center',
                icon: 'success',
                title: `Ganador ${diagonal_secundaria.charAt(0)}`,
                showConfirmButton: false,
                timer: 1000
            }
        )
        setTimeout(() => {
            reset();
        }, 1500);
    }
    coordenadas=[];
}


const jugar = (row, cell) => {
    const h1 = document.getElementById(`dato${row}${cell}`);
    if (opSymb) {
        verificarH1(h1, "X", row, cell);
        verificarGanador();
        // console.log(matriz);
    } else {

        verificarH1(h1, "0", row, cell);
        verificarGanador();
        // console.log(matriz);
    }
}

