const btnContinuarFile = document.getElementById("continuarFile");
let boletinElement = document.getElementById("boletinFile");

let estadoOco = document.getElementById("inputGroupSelect01")
let municipio = document.getElementById("inputGroupSelect02")
let localOcorrencia = document.getElementById("localOcorrencia")
let descOcorrencia = document.getElementById("descOcorrencia")

let file;

boletinElement.addEventListener("change", () => {
    file = boletinElement.files[0]
})

async function AcionarSeguro3(){

    if(file == undefined){
        alert("Escolha o arquivo do boletim")
    } else {
        window.location.href = "AcionarSeguroIII"
    }
}

async function AcionarSeguro4(){
    if(estadoOco.value == undefined || estadoOco.value == null || estadoOco.value == "" ||
    municipio.value == undefined || municipio.value == null || municipio.value == "" ){
        alert("Preencha todos os campos")
    } else {
        window.location.href = "AcionarSeguroIV"
    }
}

async function AcionarSeguro5(){
    if(localOcorrencia.value == undefined || localOcorrencia.value == null || localOcorrencia.value == "" ||
    descOcorrencia.value == undefined || descOcorrencia.value == null || descOcorrencia.value == "" ){
        alert("Preencha todos os campos")
    } else {
        window.location.href = "AcionarSeguroV"
    }
}

