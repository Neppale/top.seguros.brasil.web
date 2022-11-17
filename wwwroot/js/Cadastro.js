async function cadastraCliente() {
    var nomeCompleto = document.getElementById("nomeCompleto").value;
    var dataNascimento = document.getElementById("dataNascimento").value;

    localStorage.setItem("nome", nomeCompleto);
    localStorage.setItem("dataNascimento", dataNascimento);

    updateLocalStorage();
}