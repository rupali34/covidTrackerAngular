import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ErrormessageComponent } from '../errormessage/errormessage.component';
const URL = 'https://covid19.mathdro.id/api';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {
  /** subject behaviour to triger error */
  private showError = new BehaviorSubject<any>({ error: {}, flag: false });
  /** observable of subject variable*/
  showErrorObj = this.showError.asObservable();
  constructor(private http: HttpClient) {
  }
  /**
   * 
   * @returns Method to fetch countries list
   */
  getcountries(): Observable<any> {
    const countriesUrl = URL + '/countries'
    return this.http.get(countriesUrl);
  }
  /**
   * 
   * @returns Method to fetch charts initial data
   */
  getChartsInitialData(): Observable<any> {
    const countriesUrl = URL + '/daily'
    return this.http.get(countriesUrl);
  }
  /**
   * 
   * @param countryName 
   * @returns Method to fech covid data based on countries
   */
  getCovidData(countryName?: any): Observable<any> {
    // if no country is passed as parameter then url is not modified
    let changeableUrl = URL;
    if (countryName) {
      changeableUrl = `${URL}/countries/${countryName}`;
    }
    // destructuring javascript objects
    return this.http.get(changeableUrl);
  }
  /**
   * 
   * @param error Method to show error dialog
   */
  showErrorDialog(error: any) {
    let result = {
      error,
      flag: true
    };
    this.showError.next(result);
  }

}
