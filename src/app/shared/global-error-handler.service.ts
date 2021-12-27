import { Injectable, ErrorHandler } from '@angular/core';
import { CovidDataService } from './covid-data.service';
import { HttpErrorResponse } from 'node_modules/@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private covidDataService: CovidDataService) { }
  /**
   * 
   * @param error Method to handle error
   * @returns 
   */
  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      return;
    }
    this.covidDataService.showErrorDialog({error, httpType:false, flag: true});
  }

}
