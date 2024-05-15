// Função para inicializar a página
window.onload = function() {
    var inputAndar = document.getElementById("andar");
    inputAndar.value = "0"; // Define o valor inicial do input como "0"
    document.getElementById("terreo").disabled = true; // Desativa o botão do térreo
}

// Função para selecionar o andar
function selecionarAndar(andarSelecionado) {
    var inputAndar = document.getElementById("andar");
    var andarAtual = parseInt(inputAndar.value);
    
    console.log("Andar atual:", andarAtual);
    console.log("Andar selecionado:", andarSelecionado);

    // Armazena a imagem original do elevador
    var imagemOriginal = document.getElementById("elevador").src;
    
    // Altera a imagem do elevador
    document.getElementById("elevador").src = "img_01.jpg";

    // Desativa todos os botões enquanto a transição ocorre
    desativarBotoes();
    
    // Realiza a transição de andares
    var intervalo = setInterval(function() {
        if (andarAtual < andarSelecionado) {
            andarAtual++;
        } else {
            andarAtual--;
        }

        console.log("Transição - Andar atual:", andarAtual);

        // Atualiza o valor do input com o andar atual
        inputAndar.value = andarAtual;

        // Se chegou no andar desejado
        if (andarAtual == andarSelecionado) {
            clearInterval(intervalo); // Para a transição
            console.log("Chegou no andar desejado:", andarAtual);
            alert("Chegou no andar " + andarAtual); // Mostra um aviso
            // Reativa os botões de acordo com o andar selecionado
            switch(andarSelecionado) {
                case 0:
                    document.getElementById("terreo").disabled = true;
                    document.getElementById("primeiro-andar").disabled = false;
                    document.getElementById("segundo-andar").disabled = false;
                    document.getElementById("terceiro-andar").disabled = false;
                    break;
                case 1:
                    document.getElementById("terreo").disabled = false;
                    document.getElementById("primeiro-andar").disabled = true;
                    document.getElementById("segundo-andar").disabled = false;
                    document.getElementById("terceiro-andar").disabled = false;
                    break;
                case 2:
                    document.getElementById("terreo").disabled = false;
                    document.getElementById("primeiro-andar").disabled = false;
                    document.getElementById("segundo-andar").disabled = true;
                    document.getElementById("terceiro-andar").disabled = false;
                    break;
                case 3:
                    document.getElementById("terreo").disabled = false;
                    document.getElementById("primeiro-andar").disabled = false;
                    document.getElementById("segundo-andar").disabled = false;
                    document.getElementById("terceiro-andar").disabled = true;
                    break;
                default:
                    console.log("Andar inválido!");
                    break;
            }
            // Volta para a imagem original do elevador após a transição
            document.getElementById("elevador").src = imagemOriginal;
        }
    }, 1000); // Transição a cada 1 segundo
}



// Função para desativar todos os botões de andar
function desativarBotoes() {
    var botoes = document.querySelectorAll(".button-container button");
    botoes.forEach(function(botao) {
        botao.disabled = true;
    });
}
