export interface ISpObject {
    nombre: string;
    parametros: { parametro: string; value: string }[];
}

export const StoredProcedures: ISpObject[] = [
    {
        nombre: "puntosInformados",
        parametros: [{ parametro: "categoria", value: "" }],
    },
    {
        nombre: "puntosInformadosCircuito",
        parametros: [{ parametro: "categoria", value: "" }],
    },
    {
        nombre: "puntosInformadosPositivo",
        parametros: [{ parametro: "categoria", value: "" }],
    },
    // {
    //     nombre: "puntosInformadosTotal",
    //     parametros: [{ parametro: "categoria", value: "" }],
    // },
    {
        nombre: "calculaProyeccion",
        parametros: [
            { parametro: "categoria", value: "" },
            { parametro: "ciudad", value: "" },
        ],
    },
    {
        nombre: "calculaProyeccion2",
        parametros: [
            { parametro: "categoria", value: "" },
            { parametro: "mesa", value: "" },
        ],
    },
    {
        nombre: "calculaProyeccion3",
        parametros: [
            { parametro: "categoria", value: "" },
            { parametro: "ciudad", value: "" },
        ],
    },
    {
        nombre: "calculaProyeccionCompu",
        parametros: [
            { parametro: "categoria", value: "" },
            { parametro: "ciudad", value: "" },
        ],
    },
    {
        nombre: "calculaTotales",
        parametros: [{ parametro: "categoria", value: "" }],
    },
    {
        nombre: "comparaPaso",
        parametros: [
            { parametro: "categoria", value: "" },
            { parametro: "mesa", value: "" },
        ],
    },
    {
        nombre: "comparaPP",
        parametros: [
            { parametro: "categoria", value: "" },
            { parametro: "mesa", value: "" },
        ],
    },
    {
        nombre: "comparaPP1",
        parametros: [
            { parametro: "categoria", value: "" },
            { parametro: "mesa", value: "" },
        ],
    },
    {
        nombre: "puntosMesa",
        parametros: [
            { parametro: "punto", value: "" },
            { parametro: "circuito", value: "" },
            { parametro: "ciudad", value: "" },
        ],
    },
    //{nombre: "fn_diagramobjects",parametros: []},
    //{nombre: "sp_alterdiagram",parametros: []},
    //{nombre: "sp_creatediagram",parametros: []},
    //{nombre: "sp_dropdiagram",parametros: []},
    //{nombre: "sp_helpdiagramdefinition",parametros: []},
    //{nombre: "sp_helpdiagrams",parametros: []},
    //{nombre: "sp_renamediagram",parametros: []},
    //{nombre: "sp_upgraddiagrams",parametros: []},
];
