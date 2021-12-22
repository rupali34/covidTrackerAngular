import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ErrormessageComponent } from '../errormessage/errormessage.component';
const URL = 'https://covid19.mathdro.id/api';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {
  c:any;
   private showError = new BehaviorSubject<any>({error:{}, flag:false});
   showErrorObj = this.showError.asObservable();
  constructor(private http: HttpClient) {

   }

  getcountries(): Observable<any> {
    const countriesUrl = URL + '/countries'
   return this.http.get(countriesUrl);
  }

  getChartsInitialData(): Observable<any> {
    const countriesUrl = URL + '/daily'
   return this.http.get(countriesUrl);
  }
  getCovidData(countryName?: any): Observable<any>{
    // if no country is passed as parameter then url is not modified
    let changeableUrl = URL;
    if (countryName) {
      changeableUrl = `${URL}/countries/${countryName}`;
    }
    // destructuring javascript objects
   return this.http.get(changeableUrl);
  }

  showErrorDialog(error:any) {
    let result = {
      error,
      flag:true
    };
     this.showError.next(result); 
  }

}
