export default class Vertice {
    #x
    #y

    constructor(x, y) {
        this.#x = x;
        this.#y = y;    
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    move(dx, dy) {
        this.#x += dx;
        this.#y += dy;
    }

    equals(other) {
        return this.#x == other.#x && this.#y == other.#y;
    }

    distancia(other) {
        return Math.hypot(this.#x - other.#x, this.#y - other.#y);
    }
}
