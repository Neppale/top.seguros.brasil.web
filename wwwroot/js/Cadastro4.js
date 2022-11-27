async function getMarcas() {
    var retornoMarca = await fetch('https://tsb-api-policy-engine.herokuapp.com/fipe/marcas/')
        .then(retornoMarca => {
            return retornoMarca.json(); 
        })
    //para cada marca, adicionar um option no select com o valor do codigo e o nome da marca.
    for (var i = 0; i < retornoMarca.length; i++) {
        $('#inputGroupSelect01').append(`<option value='${retornoMarca[i].codigo}'>${retornoMarca[i].nome}</option>`);
    }

}
async function getModelo() {
    //pegar o value do inputGroupSelect01 option selecionado e passar como parametro para a url da api de modelos.
    var codigoMarca = $('#inputGroupSelect01').val();
    var retornoModelo = await fetch(`https://tsb-api-policy-engine.herokuapp.com/fipe/marcas/${codigoMarca}/modelos`)
        .then(retornoModelo => {
            return retornoModelo.json();
        })
    //para cada modelo, adicionar um option no select com o valor do codigo e o nome do modelo.
    for (var i = 0; i < retornoModelo.length; i++) {
        $('#inputGroupSelect02').append(`<option value='${retornoModelo[i].codigo}'>${retornoModelo[i].nome}</option>`);
    } 
}
async function getAno() {
    //pegar o value do inputGroupSelect02 option selecionado e passar como parametro para a url da api de anos.
    var codigoMarca = $('#inputGroupSelect01').val();
    var codigoModelo = $('#inputGroupSelect02').val();
    var retornoAno = await fetch(`https://tsb-api-policy-engine.herokuapp.com/fipe/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`)
        .then(retornoAno => {
            return retornoAno.json();
        })
    //para cada ano, adicionar um option no select com o valor do codigo e o nome do ano.
    for (var i = 0; i < retornoAno.length; i++) {
        $('#inputGroupSelect03').append(`<option value='${retornoAno[i].codigo}'>${retornoAno[i].nome}</option>`);
    }
}  
async function pagina4() {
    var nomeMarca = $('#inputGroupSelect01 option:selected').text();
    var nomeModelo = $('#inputGroupSelect02 option:selected').text();
    var anoVeiculo = $('#inputGroupSelect03 option:selected').text();

    localStorage.setItem("marca", nomeMarca);
    localStorage.setItem("modelo", nomeModelo);
    localStorage.setItem("ano", anoVeiculo);

    updateLocalStorage();
}


