#!/usr/bin/node

import Vertice from './vertice.js';
import readline from 'readline';

class Triangulo {
    #a
    #b
    #c

    constructor(a, b, c) {
        this.#a = a;
        this.#b = b;
        this.#c = c;

        if(this.area == 0)
            throw new Error("os vértices informados não formam um triângulo");
    }

    get a() {
        return this.#a;
    }

    get b() {
        return this.#b;
    }

    get c() {
        return this.#c;
    }

    equals(other) {
        let points = [other.#a, other.#b, other.#c];
        let permutation = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
        for(let i = 0; i < 6; ++i) {
            let a = points[permutation[i][0]];
            let b = points[permutation[i][1]];
            let c = points[permutation[i][2]];
            if(this.#a.equals(a) && this.#b.equals(b) && this.#c.equals(c))
                return true;
        }
        return false;
    }
    
    get perimetro() {
        let AB = Math.hypot(this.#a.x - this.#b.x, this.#a.y - this.#b.y);
        let AC = Math.hypot(this.#a.x - this.#c.x, this.#a.y - this.#c.y);
        let BC = Math.hypot(this.#b.x - this.#c.x, this.#b.y - this.#c.y);
        return AB + AC + BC;
    }

    tipo() {
        let AB = Math.hypot(this.#a.x - this.#b.x, this.#a.y - this.#b.y);
        let AC = Math.hypot(this.#a.x - this.#c.x, this.#a.y - this.#c.y);
        let BC = Math.hypot(this.#b.x - this.#c.x, this.#b.y - this.#c.y);

        if(AB == AC && AC == BC)
            return "equilátero";

        else if(AB == AC || AB == BC || AC == BC)
            return "isósceles";

        return "escaleno";
    }

    clone() {
        return new Triangulo(this.#a, this.#b, this.#c);
    }

    get area() {
        let a = this.#a;
        let b = this.#b;
        let c = this.#c;
        return Math.abs(a.x * b.y - a.y * b.x + b.x * c.y - b.y * c.x + c.x * a.y - a.x * c.y) / 2;
    }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('primeiro triângulo x1, y1, x2, y2, x3, y3:  ', (line) => {
    const [x1, y1, x2, y2, x3, y3] = line.split(' ').map(x => parseInt(x));

    let t1 = new Triangulo(new Vertice(x1, y1), new Vertice(x2, y2), new Vertice(x3, y3));

    rl.question('segundo triângulo x1, y1, x2, y2, x3, y3: ', (line) => {
        const [x1, y1, x2, y2, x3, y3] = line.split(' ').map(x => parseInt(x));

        let t2 = new Triangulo(new Vertice(x1, y1), new Vertice(x2, y2), new Vertice(x3, y3));

        rl.question('terceiro triângulo x1, y1, x2, y2, x3, y3: ', (line) => {
            const [x1, y1, x2, y2, x3, y3] = line.split(' ').map(x => parseInt(x));

            let t3 = new Triangulo(new Vertice(x1, y1), new Vertice(x2, y2), new Vertice(x3, y3));

            let clone_t1 = t1.clone(), clone_t2 = t2.clone(), clone_t3 = t3.clone();

            console.log(`o primeiro triângulo é igual ao segundo ?: ${t1.equals(t2)}`);
            console.log(`o primeiro triângulo é igual ao terceiro ?: ${t1.equals(t3)}`);
            console.log(`o segundo triângulo é igual ao terceiro ?: ${t2.equals(t3)}`);
            console.log(`perímetro do primeiro triângulo: ${t1.perimetro}`);
            console.log(`perímetro do segundo triângulo: ${t2.perimetro}`);
            console.log(`perímetro do terceiro triângulo: ${t3.perimetro}`);
            console.log(`tipo do primeiro triângulo: ${t1.tipo()}`);
            console.log(`tipo do segundo triângulo: ${t2.tipo()}`);
            console.log(`tipo do terceiro triângulo: ${t3.tipo()}`);
            console.log(`área do primeiro triângulo: ${t1.area}`);
            console.log(`área do segundo triângulo: ${t2.area}`);
            console.log(`área do terceiro triângulo: ${t3.area}`);
            console.log(`clone do primeiro triângulo: x1 = ${clone_t1.a.x}, y1 = ${clone_t1.a.y}, x2 = ${clone_t1.b.x}, y2 = ${clone_t1.b.y}, x3 = ${clone_t1.c.x}, y3 = ${clone_t1.c.y}`);
            console.log(`clone do segundo triângulo: x1 = ${clone_t2.a.x}, y1 = ${clone_t2.a.y}, x2 = ${clone_t2.b.x}, y2 = ${clone_t2.b.y}, x3 = ${clone_t2.c.x}, y3 = ${clone_t2.c.y}`);
            console.log(`clone do terceiro triângulo: x1 = ${clone_t3.a.x}, y1 = ${clone_t3.a.y}, x2 = ${clone_t3.b.x}, y2 = ${clone_t3.b.y}, x3 = ${clone_t3.c.x}, y3 = ${clone_t3.c.y}`);
            
            rl.close();
        });
    });
});
