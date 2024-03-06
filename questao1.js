#!/usr/bin/node

import Vertice from './vertice.js';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('digite o primeiro vértice x y: ', (line) => {
    const [x, y] = line.split(' ').map(x => parseInt(x));
    let a = new Vertice(x, y);

    rl.question('digite o segundo vértice x y: ', (line) => {
        const [x, y] = line.split(' ').map(x => parseInt(x));
        let b = new Vertice(x, y);

        rl.question('digite o terceiro vértice x y: ', (line) => {
            const [x, y] = line.split(' ').map(x => parseInt(x));
            let c = new Vertice(x, y);

            console.log(`o primeiro vértice é igual ao segundo ?: ${a.equals(b)}`);
            console.log(`o primeiro vértice é igual ao terceiro ?: ${a.equals(c)}`);
            console.log(`o segundo vértice é igual ao terceiro ?: ${b.equals(c)}`);
            console.log(`distância do primeiro vértice ao segundo: ${a.distancia(b)}`);
            console.log(`distância do primeiro vértice ao terceiro: ${a.distancia(c)}`);
            console.log(`distância do segundo vértice ao terceiro: ${b.distancia(c)}`);
            a.move(1, 1);
            b.move(2, 2);
            c.move(3, 3);
            console.log(`primeiro vértice x = ${a.x}, y = ${a.y}`);
            console.log(`segundo vértice x = ${b.x}, y = ${b.y}`);
            console.log(`terceiro vértice x = ${c.x}, y = ${c.y}`);
            rl.close();
        });
    });
});
