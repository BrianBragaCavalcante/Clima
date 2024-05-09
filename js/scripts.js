document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('input-principal').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            clickButton(document.getElementById('input-principal'));
        }
    });
});

function mudarFavicon(url) {
    var favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
    favicon.type = 'image/x-icon';
    favicon.rel = 'icon';
    favicon.href = url;
    if (!favicon.parentNode) {
        document.getElementsByTagName('head')[0].appendChild(favicon);
    }
    }
    
function atualizarDados(dados) {
        try {    
            img = `https://openweathermap.org/img/wn/${dados["weather"][0]["icon"]}.png`;
            console.log(dados);
            document.querySelector(".cidade").innerHTML = `Tempo em ${dados["name"]}`;
            document.querySelector(".temp").innerHTML = `${Math.floor(dados["main"]["temp"])}°C`;
            document.querySelector(".texto-previsao").innerHTML = `${dados["weather"][0]["description"]}`;
            document.querySelector(".img-previsao").src = img;
            document.querySelector(".umidade").innerHTML = `Umidade: ${dados["main"]["humidity"]}%`;
            document.getElementById('input-principal').style.border = 'none';
            document.getElementById('input-principal').style.color = 'white';
            mudarFavicon(img);
            return true
        }
        catch {
            document.getElementById('input-principal').style.border = '1px solid rgba(255, 0, 0, 30)';
            document.getElementById('input-principal').style.color = 'red';
            return false
        }
    }

async function buscarCidade(cidade) {
    const key = "cebcd482eda57fa9a6714c1c2ba91885";
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json());
    const erro = atualizarDados(dados);
    return erro
}

async function clickButton() {
    const cidade = document.querySelector(".input-cidade").value;
    const erro = await buscarCidade(cidade);
    if (erro) {
        var elementos = document.querySelectorAll(".escondido");
        elementos.forEach(function(elemento) {
            elemento.classList.remove("escondido");
        });
    }
}