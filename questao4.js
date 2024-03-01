#!/usr/bin/node

import readline from 'readline';

class Turma {
    #alunos

    constructor() {
        this.#alunos = new Map();
    }

    inserirAluno(matricula, nome) {
        if(this.#alunos.has(matricula))
            throw new Error(`o aluno ${matricula} já existe no armazenamento`);
        this.#alunos.set(matricula, {nome: nome, P1: undefined, P2: undefined});
    }

    removerAluno(matricula) {
        if(!this.#alunos.has(matricula))
            throw new Error(`o aluno ${matricula} não existe no armazenamento`);
        this.#alunos.delete(matricula);
    }

    lancarP1(matricula, nota) {
        if(!this.#alunos.has(matricula))
            throw new Error(`o aluno ${matricula} não existe no armazenamento`);
        this.#alunos.get(matricula).P1 = nota;
    }

    lancarP2(matricula, nota) {
        if(!this.#alunos.has(matricula))
            throw new Error(`o aluno ${matricula} não existe no armazenamento`);
        this.#alunos.get(matricula).P2 = nota;
    }

    imprimir() {
        let alunos = [];
        for(let matricula of this.#alunos.keys()) {
            const {nome, P1, P2} = this.#alunos.get(matricula);
            let NF = 0;
            if(P1) NF += P1;
            if(P2) NF += P2;
            NF /= 2;
            alunos.push({
                matricula: matricula,
                nome: nome,
                P1: P1,
                P2: P2,
                NF: NF
            });
        }
        alunos.sort((a, b) => {
            if(a.nome < b.nome) return  -1;
            else if(a.nome > b.nome) return 1;
            return 0;
        });
        console.log('matrícula nome P1 P2 NF');
        for(let {matricula, nome, P1, P2, NF} of alunos) {
            P1 = P1 != undefined ? P1.toFixed(1) : '-';
            P2 = P2 != undefined ? P2.toFixed(1) : '-';
            NF = NF.toFixed(1);
            console.log(`${matricula} ${nome} ${P1} ${P2} ${NF}`);
        }
    }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('digite os alunos: matrícula,nome,(P1 ou -),(P2 ou -),...,s: ', (line) => {
    const values = line.split(',');
    let turma = new Turma();

    for(let i = 0; i < values.length; i += 4) {
        let matricula = values[i];
        let nome = values[i + 1];
        let P1 = values[i + 2];
        let P2 = values[i + 3];

        turma.inserirAluno(matricula, nome);

        if(P1 != '-')
            turma.lancarP1(matricula, parseFloat(P1));

        if(P2 != '-')
            turma.lancarP2(matricula, parseFloat(P2));
    }

    turma.imprimir();

    rl.close();
});
