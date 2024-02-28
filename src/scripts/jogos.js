class Jogos {

    setJogo(jogo){
        this.jogo = jogos[jogo];
    }

    getJogo(){
        return this.jogo;
    }

    getAllJogos() {        
        return jogos;
    }
}

const jogos = {    
    megasena: {
        'title': 'mega-sena',
        'nmMin': 1,
        'nmMax': 60,
        'sortear': 6
    },
    lotofacil: {
        'title': 'lotofácil',
        'nmMin': 1,
        'nmMax': 25,
        'sortear': 15
    },
    quina: {
        'title': 'quina',
        'nmMin': 1,
        'nmMax': 80,
        'sortear': 5
    }
};

// Exportando o objeto para que possa ser importado em outros arquivos
export { Jogos };