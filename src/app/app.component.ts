import { Component , OnInit} from '@angular/core';
import { CovidDataService } from './shared/covid-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'covidTracker';
  confirmed: any;
  recovered: any;
  deaths: any;
  lastUpdate: any;
  data: any;
  chartData:any;
  chartType = 'L'
  c:any;
  constructor(public covidDataService: CovidDataService) {
    this.covidDataService.showErrorObj.subscribe(errorData => this.showErrorDialog(errorData));
   }
  ngOnInit(){
    this.fetchData();
  }
 fetchData(country?: any) {
    this.covidDataService.getCovidData(country).subscribe(result=>{
      console.log(result);
      const  { confirmed, recovered, deaths, lastUpdate }  = result;
      this.confirmed ={
        count: confirmed.value,
        lastUpdate
      } ;
      this.recovered = {
        count: recovered.value,
        lastUpdate
      };
      this.deaths = {
        count: deaths.value,
        lastUpdate
      };
      console.log(confirmed, recovered, deaths, lastUpdate );
      if(!country || country === '') {
        this.chartType = 'L';
        this.fetchChartInitialData();
      } else {
        this.chartType = 'B';
        this.chartData = {
          confirmed:  confirmed.value,
          recovered:  recovered.value ,
          deaths:  deaths.value,
          country: country
        }
      }
    });
  
  }
  fetchChartInitialData() {
this.covidDataService.getChartsInitialData().subscribe(data =>{
this.chartData = data.map((val:any) => {
  return { confirmed: val.confirmed.total, deaths: val.deaths.total, date:val.reportDate };
})
console.log(this.chartData);
});
  }


showErrorDialog(err:any) {
  console.log(err);
  if(err.flag) {
    alert(err.error.message);
  }
}

}
