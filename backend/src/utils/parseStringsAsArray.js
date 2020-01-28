module.exports = function parseStringAsArray(arrayAsString){
    return arrayAsString.split(',').map(tech => tech.trim()); // da um split na string por ',' e percorrer cada posição (com o map) tirando o espaçoes dos valores
}