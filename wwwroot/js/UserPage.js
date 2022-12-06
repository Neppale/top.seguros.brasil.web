async function getUserData() {
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }

    const rawUserData = await fetch("https://tsb-api-policy-engine.herokuapp.com/apolice/cliente/" + localStorage.getItem('id'), options);
    const userJson = await rawUserData.json();
    const data = userJson.data;

    document.getElementById("coverageTitle").innerText = data[0].cobertura.nome;
    document.getElementById("coverageDescription").innerText = data[0].cobertura.descricao;
    document.getElementById("coveragePrice").innerText = data[0].cobertura.valor;
    document.getElementById("coverageStatus").innerText = data[0].status;

}