import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from 'node_modules/@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class GlobalHttpInterceptorService implements HttpInterceptor{
   reqCount = 0;
  constructor(private spinner: NgxSpinnerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.reqCount++;
      this.showSpinner();
      return next.handle(req).pipe(finalize(()=>{
        this.reqCount--;
        if(this.reqCount === 0) {
          this.hideSpinner();
        }
      }));
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
