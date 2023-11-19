import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Comparativa, IComparativaRaw } from "../models/comparativa.model";
import { Circuito } from "../models/circuito.model";
import { IChartData } from "../components/chart/chart.component";

@Injectable()
export class AuthService {
    url: string = environment.PORT1;

    constructor(private http: HttpClient) { };

    obtenerComparativa(circuito: string[] | undefined): Promise<IChartData> {

        let params: HttpParams = new HttpParams();
        if (circuito) params = params.set("circuito", circuito.toString())
        
        return this.http
            .get(`${this.url}/comparativa`, { params })
            .toPromise()
            .then((resp: any) => {
                if (!resp) throw resp;
                return resp
                // return resp.map((elem: IComparativaRaw) => new Comparativa(elem));
            })
            .catch((err) => {
                console.log(err)
                return err;
            });
    }

    obtenerCircuitos(): Promise<Circuito[]> {
        return this.http
            .get(`${this.url}/circuitos`)
            .toPromise()
            .then((resp: any) => {
                if (!resp) throw resp;
                return resp.map((elem: Circuito) => new Circuito(elem));
            })
            .catch((err) => {
                console.log(err)
                return err;
            });
    }

}
