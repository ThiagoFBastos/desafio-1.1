#!/usr/bin/env node

import Vertice from './vertice.js';
import readline from 'readline';

class Poligono {
    #vertices

    constructor(vertices) {
        if(vertices.length < 3)
            throw new Error("o polígono deve conter pelo menos 3 vértices");
        this.#vertices = vertices;
    }

    addVertice(v) {
        if(this.#vertices.find(u => u.equals(v)) != undefined)
            return false;
        this.#vertices.push(v);
        return true;
    }

    get perimetro() {
        let resposta = 0;
        let n = this.#vertices.length;
        for(let i = 0; i < n; ++i) {
            let distancia = Math.hypot(this.#vertices[(i + 1) % n].x - this.#vertices[i].x, this.#vertices[(i + 1) % n].y - this.#vertices[i].y);
            resposta += distancia;
        }
        return resposta;
    }

    get qtdVertices() {
        return this.#vertices.length;
    }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('vértices x1 y1 x2 y2 x3 y3 ... : ', (line) => {
    let coordenadas = line.split(' ').map(x => parseInt(x));
    let vertices = [];

    for(let i = 0; i < coordenadas.length; i += 2)
        vertices.push(new Vertice(coordenadas[i], coordenadas[i + 1]));
  
    let poligono = new Poligono(vertices);

    console.log(`número de vértices = ${poligono.qtdVertices}`);
    console.log(`perímetro do polígono = ${poligono.perimetro}`);
    console.log(`adicionando um vértice: ${poligono.addVertice(new Vertice(0, 0))}`);

    rl.close();
});
