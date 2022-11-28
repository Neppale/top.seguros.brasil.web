async function Mascaras(){
    const cpfMaskara = document.getElementById("cpf");
    cpfMaskara.addEventListener("keypress", () =>{
        let cpfLength = cpfMaskara.value.length;

        if(cpfLength == 3 || cpfLength == 7){
            cpfMaskara.value += ".";
        }else if(cpfLength == 11){
            cpfMaskara.value += "-";
        }
    });
}

async function pagina2() {
    var cpf = document.getElementById("cpf").value;
    var cnh = document.getElementById("cnh").value;

    cpf = cpf.replace(".", "");
    cpf = cpf.replace(".", "");
    cpf = cpf.replace("-", "");  

    localStorage.setItem("cpf", cpf);
    localStorage.setItem("cnh", cnh);

    updateLocalStorage();
    
}
