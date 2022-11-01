import { Component } from '@angular/core';
import { ChartService } from './chart.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  result: any;
  companyName: any;
  closingPrice: number=4;
  startDate: any;
  endDate: any;
  chart: any;

  constructor(private service: ChartService) {
    Chart.register(...registerables);
  }
  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    let endpoint = '/FB/data.json?api_key=nQgyfDRtAibDZAV67VSq&limit=15';
    if (this.endDate && this.startDate){
      endpoint = endpoint+'&start_date='+this.startDate+'&end_date='+this.endDate
    }
    if(this.companyName){
      endpoint = this.companyName+'/'+endpoint
    } else {
      endpoint =  'WIKI/' + endpoint
    }
    this.service
      .nasdaqData(endpoint)
      .then((res) => {
        this.result = res;
        console.log(res);
        console.log(this.result.dataset_data.data);

        let labels = [];
        let datasets = [];
        for (let i = 0; i < this.result.dataset_data.data.length; i++) {
          labels.push(this.result.dataset_data.data[i][0]);
          datasets.push(this.result.dataset_data.data[i][this.closingPrice]);
        }

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Closing Price',
                data: datasets,
                borderWidth: 1,
                fill: false,
              },
            ],
          },
        });
      });
  }

  selectPrice(event: any) {
    this.chart.destroy();
    this.closingPrice=(event.target.value);
    this.fetchData();
    console.log(event.target.value);
  }
  setStartDate(event: any) {
    this.startDate = event.target.value;
    console.log(event.target.value);
  }
  setEndDate(event: any) {
    this.endDate = event.target.value;
    this.chart.destroy();
    this.fetchData();
  }
  selectCompany(event: any) {
    this.chart.destroy();
    this.companyName = event.target.value;
    this.fetchData()
  }
}
