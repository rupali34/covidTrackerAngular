import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CovidDataService } from '../shared/covid-data.service';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.css']
})
export class CountrySelectorComponent implements OnInit {
  @Output() countryChange = new EventEmitter<any>();
  constructor(public covidDataService: CovidDataService) { }
  selectedCountry: any;
  countries: any = [{name:'India'}, {name:'UK'}, {name: 'Global'}];
  ngOnInit(): void {
    this.selectedCountry = '';
    this.covidDataService.getcountries().subscribe(result=>{
      // console.log(result);
      this.countries = result.countries;
    });
  }

  oncountryChange(event:any) {
    console.log(event);
    let countryName = '';
    if(event.value) {
      countryName = event.value.name;
    }
   this.countryChange.emit(countryName);
  }

}
