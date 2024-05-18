const apiEstatisticas = 'https://resultados-loteria-api.vercel.app/api/lottery-results/statistical/{nmJogo}';

function getDadosEstatisticos(nmJogo) {
    const endpoint = getEndpoint(apiEstatisticas, nmJogo);

    // Retornando a promessa gerada pelo fetch
    return fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao acessar a API: ' + response.status);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
}

function getEndpoint(url, nmJogo) {
    return url.replace('{nmJogo}', nmJogo);
}

export default { getDadosEstatisticos };
