import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Comparativa, IComparativaRaw } from 'src/app/models/comparativa.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  error: any;
  data: Comparativa[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    const url: string = environment.PORT1;

    this.http
      .get(`${url}/comparativa`)
      .toPromise()
      .then((resp: IComparativaRaw[]) => {
        if (!resp) return (this.error = resp);
        this.data = resp.map(elem => new Comparativa(elem));
      })
      .catch((err) => {
        this.error = err;
      });
  }

}
