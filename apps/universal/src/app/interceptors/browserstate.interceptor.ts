import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class BrowserStateInterceptor implements HttpInterceptor {

  constructor(
    private readonly transferState: TransferState,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const cachedResponse: string = this.transferState.get(makeStateKey(req.url), null);

    if (cachedResponse) {
      const response = new HttpResponse({ body: cachedResponse, status: 200 });
      return of(response);
    }

    return next.handle(req);
  }
}
