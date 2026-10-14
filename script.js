async function buscarResposta() {
    const inputPergunta = document.getElementById("campo-pergunta");
    const pergunta = inputPergunta.value.trim();
    
    const loading = document.getElementById("loading");
    const caixaResultado = document.getElementById("caixa-resultado");
    const textoResposta = document.getElementById("texto-resposta");
    const iframeBusca = document.getElementById("iframe-busca");

    if (!pergunta) {
        alert("Por favor, digite uma pergunta sobre futebol!");
        return;
    }

    loading.style.display = "block";
    caixaResultado.style.display = "none";

    // 1. Carrega o DuckDuckGo diretamente no iframe dentro da sua página
    const termoBusca = encodeURIComponent(pergunta + " futebol noticias");
    iframeBusca.src = `https://html.duckduckgo.com/html/?q=${termoBusca}`;

    try {
        // 2. Busca resumo via Wikipedia API em Português
        const wikiUrl = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pergunta)}`;
        const responseWiki = await fetch(wikiUrl);
        
        if (responseWiki.ok) {
            const dataWiki = await responseWiki.json();
            if (dataWiki.extract) {
                textoResposta.textContent = dataWiki.extract;
            } else {
                textoResposta.textContent = `Resultados em tempo real carregados diretamente abaixo na página:`;
            }
        } else {
            textoResposta.textContent = `Confira os resultados completos e notícias carregados abaixo diretamente nesta página:`;
        }
    } catch (e) {
        textoResposta.textContent = `Resultados carregados diretamente na tela abaixo:`;
    }

    loading.style.display = "none";
    caixaResultado.style.display = "flex";
}

// Executa a busca ao pressionar a tecla ENTER
document.getElementById("campo-pergunta").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        buscarResposta();
    }
});