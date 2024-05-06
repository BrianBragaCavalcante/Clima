
const key = "cebcd482eda57fa9a6714c1c2ba91885"

function atualizarDados(dados) {
    document.querySelector(".cidade").innerHTML = `Tempo em ${dados["name"]}`

    document.querySelector(".temp").innerHTML = `${Math.floor(dados["main"]["temp"])}°C`

    document.querySelector(".texto-previsao").innerHTML = `${dados["weather"][0]["description"]}`
    document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados["weather"][0]["icon"]}.png`

    document.querySelector(".umidade").innerHTML = `Umidade: ${dados["main"]["humidity"]}%`
}

async function buscarCidade(cidade) {
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json())
    return dados

}

function clickButton() {
    const cidade = document.querySelector(".input-cidade").value;

    try {
        const dados = buscarCidade(cidade);

        const elementos = document.querySelectorAll(".escondido");
        elementos.forEach(elemento => {
            elemento.classList.remove("escondido");
        });
        
        atualizarDados(dados);

    } catch (error) {
        document.querySelector(".cidade").innerHTML = `Cidade não ${cidade} encontrada`;
    }
}

