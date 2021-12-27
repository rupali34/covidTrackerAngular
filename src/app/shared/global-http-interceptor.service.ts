import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from 'node_modules/@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class GlobalHttpInterceptorService implements HttpInterceptor {
  /** Variable to hold req counts */
  reqCount = 0;
  constructor(private spinner: NgxSpinnerService) { }
  /**
   * 
   * @param req 
   * @param next 
   * @returns handles operations related to request
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.reqCount++;
    this.showSpinner();
    return next.handle(req).pipe(catchError((err) => {
      // console.error(err);
      alert('Oh! Error occured');
      this.handleError(err);
      return throwError(err);    //Rethrow error it back to component
    }), finalize(() => {
      this.reqCount--;
      if (this.reqCount === 0) {
        this.hideSpinner();
      }
    }));
  }
  /**
   * 
   * @param error Method to handle errors 
   */
  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error("Error Event");
      } else {
        console.log(`error status : `, error);
      }
    }
    else {
      console.error("Other Errors");
    }
  }
  /**
* Method to show spinner
*/
  showSpinner() {
    this.spinner.show();
  }
  /**
 * Method to hide spinner
 */
  hideSpinner() {
    this.spinner.hide();
  }
}
