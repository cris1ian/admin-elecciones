import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TableData } from "../../models/table-data.model";
import { ISpObject, StoredProcedures } from '../../models/stored-procedures-list';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tabla-sp',
  templateUrl: './tabla-sp.component.html',
  styleUrls: ['./tabla-sp.component.scss']
})
export class TablaSpComponent implements OnInit {
  spList: ISpObject[] = StoredProcedures;
  spSelected: ISpObject | undefined = undefined;
  error: any;
  esProvinciales: boolean = true;

  displayedColumns: string[] = [];
  dataSource: TableData[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.execSp();
  }

  execSp = () => {
    if (!this.spSelected) return;

    const parametros: string = this.spSelected.parametros
      .map((elem: any) => elem.value)
      .join(" ");

    this.error = undefined;
    this.dataSource = [];
    const url: string = this.esProvinciales
      ? environment.PORT1
      : environment.PORT2;
    this.http
      .get(`${url}/admin-sp/${this.spSelected.nombre} ${parametros}`)
      .toPromise()
      .then((resp: any) => {
        if (!resp) return (this.error = resp);
        this.dataSource = resp;
        this.displayedColumns = Object.keys(resp[0]);
      })
      .catch((err) => {
        this.error = err;
      });
  };

}
