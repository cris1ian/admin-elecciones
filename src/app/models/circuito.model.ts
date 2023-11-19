export interface ICircuitoRaw {
    id: number;
    descripcion: string;
}

export class Circuito {
    id: number;
    descripcion: string;

    constructor(circuito: ICircuitoRaw) {
        this.id = circuito.id;
        this.descripcion = circuito.descripcion;
    }
}
