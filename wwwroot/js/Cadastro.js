//faça uma função para formatar a data em ano/mês/dia.
async function formatarData() {
    const dataNascimento = document.getElementById("dataNascimento");
    dataNascimento.addEventListener("keypress", () => {
        let dataNascimentoLength = dataNascimento.value.length;

        if (dataNascimentoLength == 4 || dataNascimentoLength == 7) {
            dataNascimento.value += "/";
        }
    });
}
async function cadastraCliente() {


    var nomeCompleto = document.getElementById("nomeCompleto").value;
    var dataNascimento = document.getElementById("dataNascimento").value;

    dataNascimento = dataNascimento.replace("/", "");
    dataNascimento = dataNascimento.replace("/", "");

    localStorage.setItem("nome", nomeCompleto);
    localStorage.setItem("dataNascimento", dataNascimento);

    updateLocalStorage();
}