import { Component, OnDestroy, OnInit } from '@angular/core';
import { Comparativa } from '../../models/comparativa.model';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { Circuito } from '../../models/circuito.model';
import { AuthService } from '../../services/auth.service';

export interface IChartData {
  labels: string[];
  dataset: { label: string, data: string[], backgroundColor: string }[]
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements OnInit, OnDestroy {
  chart: any;
  error: any;
  circuitosLista: Circuito[] = [];
  data: Comparativa[] = [];
  circuitos = new FormControl<Circuito[]>([]);
  private refreshInterval: any;

  constructor(private http: HttpClient, private auth: AuthService) { }

  ngOnInit() {
    this.initChart();
    this.getData();
    this.getCircuitos();
    this.setRefreshInterval();
    this.suscribeToSelectionChange();
  }

  ngOnDestroy() {
    clearInterval(this.refreshInterval);
  }

  initChart() {
    this.chart = new Chart("MyChart", { type: "bar", data: { labels: [], datasets: [] } });
  }

  setRefreshInterval() {
    this.refreshInterval = setInterval(() => this.getData(), 5 * 60 * 1000);
  }

  suscribeToSelectionChange() {
    this.circuitos.valueChanges.subscribe(() => this.getData());
  };

  async getCircuitos() {
    try {
      const _circuitosLista: Circuito[] = await this.auth.obtenerCircuitos();
      this.circuitosLista = _circuitosLista;
    } catch (error) {
      this.error = error
    }
  }

  async getData() {
    this.error = undefined;
    const idList: string[] | undefined = this.circuitos.value?.map(elem => elem.descripcion);
    try {
      const _data: IChartData = await this.auth.obtenerComparativa(idList);

      this.chart.data.labels = _data.labels;
      this.chart.data.datasets = _data.dataset;
      this.chart.update();
    } catch (error) {
      this.error = error
    }
  }

  // procesarData(data: Comparativa[]): IChartData {
  //   const _data: Comparativa[] = data.sort((a: Comparativa, b: Comparativa) => Number(a.circuito) - Number(b.circuito));

  //   const labels: string[] = this.obtenerDataSet(_data, "massa", true, true);

  //   const reference = [
  //     {
  //       label: "Massa Gen",
  //       data: this.obtenerDataSet(_data, "massa", true),
  //       backgroundColor: '#0f7ca3'
  //     },
  //     {
  //       label: "Massa Bal",
  //       data: this.obtenerDataSet(_data, "massa", false),
  //       backgroundColor: '#37bbed'
  //     },
  //     {
  //       label: "Milei Gen",
  //       data: this.obtenerDataSet(_data, "milei", true),
  //       backgroundColor: '#d100a4'
  //     },
  //     {
  //       label: "Milei Bal",
  //       data: this.obtenerDataSet(_data, "milei", false),
  //       backgroundColor: '#FF00C8'
  //     }
  //   ];

  //   return { dataset: reference, labels: labels }
  // }


  // obtenerDataSet(data: Comparativa[], candidato: "massa" | "milei", isGeneral: boolean, isLabel: boolean = false): string[] {

  //   const filteredData: Comparativa[] = data.filter((elem: Comparativa) => {
  //     const includesGeneral = elem.descripcion.toLowerCase().includes('eneral');
  //     const includesCandidato = elem.nombreCandidato.toLowerCase().includes(candidato);
  //     const includesCircuito = this.circuitos.value?.some(val => val.descripcion === String(elem.circuito));
  //     // const includesCircuito = this.circuitos.value?.map(elem => elem.descripcion).find(elem.circuito);
  //     if (includesCircuito) console.log(includesCircuito, elem, this.circuitos.value);

  //     return includesCandidato && includesCircuito && (isGeneral ? includesGeneral : !includesGeneral)
  //   });

  //   return filteredData.map((elem: Comparativa) => `${isLabel ? elem.circuito : elem.cantidadvotos}`)

  // }

}
