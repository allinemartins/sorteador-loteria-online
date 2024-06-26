import dadosEstatisticos from './apiDadosEstatisticos.js';


class Estatisticas {
    
    constructor(objJogo, nmJogo){
        this.jogo = objJogo;
        this.nmJogo = nmJogo;
        this.haveDados = true;
    }

    getEstatisticas(){
        return this.estatisticas;
    }

    getEstatisticasNumero(numero){
        return this.estatisticas[numero];
    }

    getHaveDados(){
        return this.haveDados;
    }

    async setEstatisticas(){
        return dadosEstatisticos.getDadosEstatisticos(this.nmJogo).then(response =>{
            this.estatisticas = [];
            this.gerarEstatisticas(response);
        }).catch(_error => {
            this.estatisticas = [];
            this.gerarEstatisticas({});
            this.haveDados = false;
        });        
    }

    gerarEstatisticas(dadosEstatisticos){
        for(let i = this.jogo.nmMin; i <= this.jogo.nmMax; i++){
            this.estatisticas[i] = dadosEstatisticos.data[0].statistical[i] ? dadosEstatisticos.data[0].statistical[i] : this.getNumero(i);
        }
    }

    getNumero(){
        const numero = {
            draw: 0,
            delayed: 0,
            lastDraw: 0,
            largestGap: 0,
            largestFrequency: 0,
            lastFrequency: 0
        }
        return numero;
    }

}

export {Estatisticas};