function mudarFavicon(url) {
    var favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
    favicon.type = 'image/x-icon';
    favicon.rel = 'icon';
    favicon.href = url;
    if (!favicon.parentNode) {
        document.getElementsByTagName('head')[0].appendChild(favicon);}}
function atualizarDados(dados) {
    try {
        selectClass = document.querySelector
        img = `https://openweathermap.org/img/wn/${dados["weather"][0]["icon"]}.png`
        selectClass(".cidade").innerHTML = `Tempo em ${dados["name"]}`
        selectClass(".temp").innerHTML = `${Math.floor(dados["main"]["temp"])}°C`
        selectClass(".texto-previsao").innerHTML = `${dados["weather"][0]["description"]}`
        selectClass(".img-previsao").src = img
        selectClass(".umidade").innerHTML = `Umidade: ${dados["main"]["humidity"]}%`
        mudarFavicon(img)}
    catch (error) {
        document.querySelector(".cidade").innerHTML = `Cidade não encontrada`;}}
async function buscarCidade(cidade) {
    const key = "cebcd482eda57fa9a6714c1c2ba91885"
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json())
    atualizarDados(dados)}
function clickButton() {
    const cidade = document.querySelector(".input-cidade").value
    buscarCidade(cidade);
    var elementos = document.querySelectorAll(".escondido");
    elementos.forEach(function(elemento) {
        elemento.classList.remove("escondido");
    });}