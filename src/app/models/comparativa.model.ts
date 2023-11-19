export interface IComparativaRaw {
    descripcion: string;
    nombre_candidato: string;
    cantidadvotos: number;
    Establecimiento: string;
    localidad: string;
    circuito: string;
}

export class Comparativa {
    descripcion: string;
    nombreCandidato: string;
    cantidadvotos: number;
    establecimiento: string;
    localidad: string;
    circuito: string;

    constructor(comparativa: IComparativaRaw) {
        this.descripcion = comparativa.descripcion;
        this.nombreCandidato = comparativa.nombre_candidato;
        this.cantidadvotos = comparativa.cantidadvotos;
        this.establecimiento = comparativa.Establecimiento;
        this.localidad = comparativa.localidad;
        this.circuito = comparativa.circuito;
    }
}
