import { Component, OnDestroy, OnInit } from '@angular/core';
import { Comparativa, IComparativaRaw } from '../../models/comparativa.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Chart from 'chart.js/auto';

interface IChartData {
  labels: string[];
  dataset: { label: string, data: string[], backgroundColor: string }[]
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit, OnDestroy {
  chart: any;
  error: any;
  data: Comparativa[] = [];
  private refreshInterval: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getData();
    this.setRefreshInterval();
  }

  ngOnDestroy() {
    clearInterval(this.refreshInterval);
  }

  setRefreshInterval() {
    this.refreshInterval = setInterval(() => this.getData(), 5 * 60 * 1000);
  }

  getData() {
    const url: string = environment.PORT1;

    this.http
      .get(`${url}/comparativa`)
      .toPromise()
      .then((resp: any) => {
        if (!resp) return (this.error = resp);
        this.data = resp.map((elem: IComparativaRaw) => new Comparativa(elem));
        this.createChart(this.data);
      })
      .catch((err) => {
        console.log(err)
        this.error = err;
      });
  }

  createChart(data: Comparativa[]) {
    const dataProcesada: IChartData = this.procesarData(data);

    if (!this.chart)
      this.chart = new Chart("MyChart", { type: "bar", data: { labels: [], datasets: [] } });

    this.chart.data.labels = dataProcesada.labels;
    this.chart.data.datasets = dataProcesada.dataset;
    this.chart.update();

  }

  procesarData(data: Comparativa[]): IChartData {
    const _data: Comparativa[] = data.sort((a: Comparativa, b: Comparativa) => Number(a.circuito) - Number(b.circuito));

    const labels: string[] = this.obtenerDataSet(_data, "massa", true, true);

    const reference = [
      {
        label: "Massa Gen",
        data: this.obtenerDataSet(_data, "massa", true),
        backgroundColor: '#0f7ca3'
      },
      {
        label: "Massa Bal",
        data: this.obtenerDataSet(_data, "massa", false),
        backgroundColor: '#37bbed'
      },
      {
        label: "Milei Gen",
        data: this.obtenerDataSet(_data, "milei", true),
        backgroundColor: '#d100a4'
      },
      {
        label: "Milei Bal",
        data: this.obtenerDataSet(_data, "milei", false),
        backgroundColor: '#FF00C8'
      }
    ];

    return { dataset: reference, labels: labels }
  }


  obtenerDataSet(data: Comparativa[], candidato: "massa" | "milei", isGeneral: boolean, isLabel: boolean = false): string[] {

    const filteredData: Comparativa[] = data.filter((elem: Comparativa) => {
      const includesGeneral = elem.descripcion.toLowerCase().includes('eneral');
      const includesCandidato = elem.nombreCandidato.toLowerCase().includes(candidato);

      return includesCandidato && (isGeneral ? includesGeneral : !includesGeneral)
    });

    return filteredData.map((elem: Comparativa) => `${isLabel ? elem.circuito : elem.cantidadvotos}`)

  }

}
