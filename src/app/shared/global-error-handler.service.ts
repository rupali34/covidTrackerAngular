import { Injectable, ErrorHandler } from '@angular/core';
import { CovidDataService } from './covid-data.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private covidDataService : CovidDataService) { }
  handleError(error: any): void {
      this.covidDataService.showErrorDialog(error);
      // console.error('An error occured', error.message)
  }
  
}
