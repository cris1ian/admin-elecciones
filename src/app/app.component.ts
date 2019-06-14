import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    spName: string = 'puntosInformados 1';

    columns: any;
    data: any[];

    constructor(
        private http: HttpClient
    ) { }

    execSp = () => this.http.get(`${environment.WS_URL}/admin-sp/${this.spName}`).toPromise()
        .then(
            (resp: any) => {
                if (resp && resp.length > 0) {
                    this.columns = Object.keys(resp[0])
                    this.data = resp;
                } else {
                    alert(resp)
                }
            }
        )
        .catch(
            err => alert(err)
        )
    
    getColumns = () => Object.values(this.columns)
}
