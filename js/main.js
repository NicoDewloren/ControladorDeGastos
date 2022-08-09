// Funciones


function validarGastos() {

    let gastosObtenidos = obtenerGastosLS();

    let gasto = document.getElementById("gasto").value;
    let monto = document.getElementById("monto").value;
    let fecha = document.getElementById("fecha").value;

    if (fecha == "" || fecha == null) {
        document.getElementById("error_fecha").className = "letra-validacion text-danger"
        document.getElementById("error_fecha").innerText = "Ingresa la fecha del gasto"
        return false
    } else {
        document.getElementById("error_fecha").innerText = ""
    }


    if (gasto == "" || gasto == null) {
        document.getElementById("error_gasto").className = "letra-validacion text-danger"
        document.getElementById("error_gasto").innerText = "Ingresa el nombre del gasto"
        return false
    } else {
        document.getElementById("error_gasto").innerText = ""
    }


    if (monto == "" || monto == null) {
        document.getElementById("error_monto").className = "letra-validacion text-danger"
        document.getElementById("error_monto").innerText = "Ingresa el monto del gasto"
        return false
    } else {
        document.getElementById("error_monto").innerText = ""
    }

    monto = parseFloat(monto)

    const gastos = { "gasto": gasto, "monto": monto, "fecha": fecha };
    gastosObtenidos.push(gastos);


    guardarGastosEnLS(gastosObtenidos);
    dibujarGastos();
    limpiarFormulario();
}


function dibujarGastos() {

    gastosAcumulados = obtenerGastosLS();
    let resultado = document.getElementById("resultado")
    let contenido = `<h2 class="text-center mt-5 mb-5"> Gastos mensuales </h2>`


    if (gastosAcumulados.length == 0) {
        contenido = `<p class="alert alert-danger text-center mt-5" role="alert">No tienes ningun gasto cargado!</p>`
    }
    else if (gastosAcumulados.length >= 1) {

        let total = 0;

        for (gasto of gastosAcumulados) {
            contenido += `<table class="table text-center">
            <tr class="row">
            <td class="col-md-4 align-middle">${gasto.fecha}</td> 
            <td class="col-md-4 align-middle">${gasto.gasto}</td>       
            <td class="col-md-4 align-middle"><b>$${gasto.monto}</b></td>           
            </tr>
            </table>`
            total += gasto.monto

        }
        console.log(monto)
        contenido += `<p class="text-center bg-warning py-2"> El total gastado en el mes es : <b>$${total}</b>`
        contenido += `<p class="text-end"><a href="#" class="btn btn-danger text-white" onclick="limpiarGastos()"  title="Limpiar gastos">Limpiar gastos</p>`

    }

    resultado.innerHTML = contenido
}


function limpiarFormulario() {

    let formulario = document.getElementById("formulario")

    formulario.reset();
}


// Funciones de LS 

function guardarGastosEnLS(gasto) {

    localStorage.setItem("gastos", JSON.stringify(gasto))

};

function obtenerGastosLS() {
    return JSON.parse(localStorage.getItem("gastos")) || [];
}

function limpiarGastos() {

    localStorage.removeItem("gastos")
    dibujarGastos()

}

// Eventos 

document.getElementById("botonEnviar").addEventListener("click", validarGastos);

// Ejecucion

dibujarGastos();
















