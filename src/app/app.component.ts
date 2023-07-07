import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { TableData } from "./models/table-data.model";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    spName: string = "puntosInformados 1";
    error: any;
    esProvinciales: boolean = true;

    displayedColumns: string[] = [
        "punto",
        "comp",
        "Establecimiento",
        "Informados",
    ];
    dataSource: TableData[];

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.execSp();
    }

    execSp = () => {
        this.error = undefined;
        this.dataSource = undefined;
        const url: string = this.esProvinciales
            ? environment.PORT1
            : environment.PORT2;
        this.http
            .get(`${url}/admin-sp/${this.spName}`)
            .toPromise()
            .then((resp: any) => {
                if (!resp) {
                    this.error = resp;
                    return;
                }
                this.dataSource = resp;
            })
            .catch((err) => {
                this.error = err;
            });
    };
}
