import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts'
import HC_exporting from 'highcharts/modules/exporting'

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  @Input() chartData: any;
  chartOptions = {};
  Highcharts = Highcharts

  dataForXAxis!: number[]
  dataForYAxis!: number[]


  constructor() { }

  ngOnInit(): void {
    this.chartData.forEach((stock:any) => {

      if (!this.dataForXAxis) {
        this.dataForXAxis = stock.stockData.date.map((date: string) => {
          var time = new Date(date)
          return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`
        })
      }
      stock.data = stock.stockData.value.map((price: string | number) => +price)
    })
    
    this.chartOptions = {
      chart: {
        type: 'area'
      },
      title: {
        text: 'My Portfolio Overview ($ per Stock)'
      },
      tooltip: {
        split: true,
        valuePrefix: '$'
      },
      credits: {
        enabled: false //remove credits line
      },
      exporting: {
        enables: true,
      },
      yAxis: {
        title: {
          text: '$ price',
        }
      },
      xAxis: {
        categories: this.dataForXAxis.reverse(),
        tickInterval: 19,
        labels: {
          x: 26,
        }
      },
      series: this.chartData,
    };

    HC_exporting(Highcharts);

    setInterval(() => {
      window.dispatchEvent(
        new Event('resize')
      ), 1000
    })
  }

}
