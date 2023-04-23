// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpHandler,
//   HttpRequest,
//   HttpEvent,
//   HttpHeaders,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { delay, finalize } from 'rxjs/operators';
// import { LoadingService } from '../Services/Loading/LoadingService';
// import { LoadingSpinnerComponent } from '../Component/Animation/loading-spinner/loading-spinner.component';

// @Injectable({
//   providedIn: 'root'
// })
// @Injectable()
// export class LoadingInterceptorService implements HttpInterceptor {
//   constructor(private loadingService: LoadingService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     delay(10000);

//     this.loadingService.showLoading();
//     const authToken = localStorage.getItem('token');

//     if (authToken) {

//       const httpOptions = {
//         headers: new HttpHeaders({
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${authToken}`
//         })
//       };

//       req = req.clone(httpOptions);
//     }

//     return next.handle(req).pipe(
//       finalize(() => {
//         this.loadingService.hideLoading();
//       })
//     );
//   }
// }


import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { LoadingService } from '../Services/Loading/LoadingService';
import { LoadingSpinnerComponent } from '../Component/Animation/loading-spinner/loading-spinner.component';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class LoadingInterceptorService implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const delayedRequest = next.handle(req).pipe(delay(1000)); // add delay here

    this.loadingService.showLoading();
    const authToken = localStorage.getItem('token');

    if (authToken) {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        })
      };

      req = req.clone(httpOptions);
    }

    return delayedRequest.pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }
}
