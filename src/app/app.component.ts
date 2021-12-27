import { Component, OnInit } from '@angular/core';
import { CovidDataService } from './shared/covid-data.service';
import { Title } from '@angular/platform-browser';
import { DialogService } from 'primeng/dynamicdialog';
import { ErrormessageComponent } from './errormessage/errormessage.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DialogService]
})
export class AppComponent {
  /** Variable to hold title of page */
  title = 'Covid Tracker ';
  /** Variable to hold confirmed cases data */
  confirmed: any;
  /** Variable to hold recoverd cases data */
  recovered: any;
  /** Variable to hold death cases data */
  deaths: any;
  /** Variable to hold last update value */
  lastUpdate: any;
  /** Variable to hold chart data */
  data: any;
  /** Variable to hold chart data */
  chartData: any;
  /** Variable to hold chart type */
  chartType = 'L';
  c:any;
  constructor(public covidDataService: CovidDataService, private titleService: Title, public dialogService: DialogService) {
    this.covidDataService.showErrorObj.subscribe(errorData => this.showErrorDialog(errorData));
  }
  /**
   * Method to set initial data
   */
  ngOnInit() {
    this.fetchData();
    // console.log(this.c.u);
  }
  /**
   * 
   * @param titleVal Method to set page title
   */
  setPageTitle(titleVal: any) {
    this.titleService.setTitle(titleVal);
  }
  /**
   * 
   * @param country Method to fetch data
   */
  fetchData(country?: any) {
    this.covidDataService.getCovidData(country).subscribe(result => {
      console.log(result);
      const { confirmed, recovered, deaths, lastUpdate } = result;
      this.confirmed = {
        count: confirmed.value,
        lastUpdate
      };
      this.recovered = {
        count: recovered.value,
        lastUpdate
      };
      this.deaths = {
        count: deaths.value,
        lastUpdate
      };
      console.log(confirmed, recovered, deaths, lastUpdate);
      if (!country || country === '') {
        this.setPageTitle(this.title + 'Global');
        this.chartType = 'L';
        this.fetchChartInitialData();
      } else {
        this.setPageTitle(this.title + country);
        this.chartType = 'B';
        this.chartData = {
          confirmed: confirmed.value,
          recovered: recovered.value,
          deaths: deaths.value,
          country: country
        }
      }
    });

  }
  /**
   * Method to fetch chart initial data
   */
  fetchChartInitialData() {
    this.covidDataService.getChartsInitialData().subscribe(data => {
      this.chartData = data.map((val: any) => {
        return { confirmed: val.confirmed.total, deaths: val.deaths.total, date: val.reportDate };
      })
      console.log(this.chartData);
    });
  }

  /**
   * 
   * @param err Mathod to show error alert
   */
  showErrorDialog(err: any) {
    console.log(err);
    if (err.flag) {
      alert(err.error.message);
      const ref = this.dialogService.open(ErrormessageComponent, {
        header: 'Choose a Car',
        width: '70%'
    });
    }
  }

}
