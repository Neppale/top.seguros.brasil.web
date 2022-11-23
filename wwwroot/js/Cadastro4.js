async function getModelo() {
    var retornoModelo = await fetch('https://tsb-api-policy-engine.herokuapp.com/fipe/marcas/1/modelos/')
        .then(retornoModelo => {
            return retornoModelo.json();
        })

    for (var i = 0; i < retornoModelo.length; i++) {
        $('#inputGroupSelect02').append(`<option value='${retornoModelo[i].codigo}'>${retornoModelo[i].nome}</option>`);
    }


}
async function getMarcas() {
    var retornoMarca = await fetch('https://tsb-api-policy-engine.herokuapp.com/fipe/marcas/')
        .then(retornoMarca => {
            return retornoMarca.json(); })

    var resposta = retornoMarca;
    
    //para cada marca, adicionar um option no select com o valor do codigo e o nome da marca.
    for (var i = 0; i < resposta.length; i++) {
        $('#inputGroupSelect01').append(`<option value='${resposta[i].codigo}'>${resposta[i].nome}</option>`);
    }
    getModelo();
    if (resposta.codigo === retornoModelo.codigo && resposta.nome === retornoModelo.nome) {
        
        console.log("ok");
        alert("ok");
    }
    
}



