import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CovidDataService } from '../shared/covid-data.service';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.css']
})
export class CountrySelectorComponent implements OnInit {
  /** output variable to emit country change event */
  @Output() countryChange = new EventEmitter<any>();
  /** variable to hold selected country */
  selectedCountry: any;
  /** variable to hold countries list */
  countries: any = [{ name: 'India' }, { name: 'UK' }, { name: 'Global' }];

  constructor(public covidDataService: CovidDataService) { }
  /**
   * Methos to set initia data
   */
  ngOnInit(): void {
    this.selectedCountry = '';
    this.covidDataService.getcountries().subscribe(result => {
      this.countries = result.countries;
    });
  }
  /**
   * 
   * @param event Method to get call on country change
   */
  oncountryChange(event: any) {
    console.log(event);
    let countryName = '';
    if (event.value) {
      countryName = event.value.name;
    }
    this.countryChange.emit(countryName);
  }

}
