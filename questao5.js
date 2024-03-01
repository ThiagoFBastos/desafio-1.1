#!/usr/bin/node

import readline from 'readline';

class Cliente {
    #nome
    #cpf
    #data_nascimento
    #renda_mensal
    #estado_civil
    #dependentes

    get nome() {
        return this.#nome;
    }

    set nome(valor) {
        if(valor.length < 5)
            throw new Error("o campo nome deve conter pelo menos 5 caracteres");
        this.#nome = valor;
    }

    get cpf() {
        let CPF = this.#cpf.toString();
        return CPF.substr(0, 3) + '.' + CPF.substr(3, 3) + '.' + CPF.substr(6, 3) + '-' + CPF.substr(9, 2);
    }

    set cpf(valor) {
        let re = /^\d{11}$/;
        if(!re.test(valor))
            throw new Error("o campo cpf não contém o formato correto de 11 digitos");
        this.#cpf = parseInt(valor);
    }

    get data_nascimento() {
        return this.#data_nascimento;
    }

    set data_nascimento(valor) {
        let re = /\d{2}\/\d{2}\/\d{4}/;
        if(!re.test(valor))
            throw new Error("o campo data de nascimento não contém o formato correto: DD/MM/AAAA");
        this.#data_nascimento = valor;
    }

    get renda_mensal() {
        return this.#renda_mensal;
    }

    set renda_mensal(valor) {
        let re = /^\d+,\d{2}$/
        if(!re.test(valor))
            throw new Error("o campo renda mensal não contém o formato correto: valor com duas casas decimais e vírgula");
        this.#renda_mensal = parseFloat(valor.replace(',', '.')).toFixed(2);
    }

    get estado_civil() {
        return this.#estado_civil;
    }

    set estado_civil(valor) {
        let re = /^[cCsSvVdD]$/
        if(!re.test(valor))
            throw new Error("o campo estado civil não contém o formato correto: c, C, s, S, v, V, d ou D");
        this.#estado_civil = valor;
    }

    get dependentes() {
        return this.#dependentes;
    }

    set dependentes(valor) {
        let re = /^\d+$/;
        if(!re.test(valor))
            throw new Error("o campo dependentes não possui o valor correto: número de 0 `a 10");
        valor = parseInt(valor);
        if(valor < 0 || valor > 10)
            throw new Error("o campo dependentes não possui o valor correto: número de 0 `a 10");
        this.#dependentes = valor;
    }

    imprimir() {
        console.log(`Nome = ${this.nome}\nCPF = ${this.cpf}\nData de Nascimento = ${this.data_nascimento}\nRenda Mensal = ${this.renda_mensal}\nEstado Civil = ${this.estado_civil}\nDependentes = ${this.dependentes}`);
    }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('nome: ', (nome) => {
    rl.question('cpf: ', (cpf) => {
        rl.question('data de nascimento: ', (data_nascimento) => {
            rl.question('renda mensal: ', (renda_mensal) => {
                rl.question('estado civil: ', (estado_civil) => {
                    rl.question('dependentes: ', (dependentes) => {
                        let cliente = new Cliente();
                        cliente.nome = nome;
                        cliente.cpf = cpf;
                        cliente.data_nascimento = data_nascimento;
                        cliente.renda_mensal = renda_mensal;
                        cliente.estado_civil = estado_civil;
                        cliente.dependentes = dependentes;
                        cliente.imprimir();
                        rl.close();
                    });
                });
            });
        });
    });
});
