async function Pagina2() {
    var cpf = document.getElementById("cpf").value;
    var cnh = document.getElementById("cnh").value;

    localStorage.setItem("cpf", cpf);
    localStorage.setItem("cnh", cnh);

    updateLocalStorage();
}