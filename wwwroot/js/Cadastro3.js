async function pagina3() {
    var Email = document.getElementById("Email").value;
    var Senha = document.getElementById("Senha").value;
    var confirmeSenha = document.getElementById("confirmeSenha").value;

    localStorage.setItem("Email", Email);
    localStorage.setItem("Senha", Senha);
    localStorage.setItem("confimeSenha", confirmeSenha)


    updateLocalStorage();
}