import { RequestCacheService } from '@/services';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, tap } from 'rxjs';

//* Reference: https://angular.io/guide/http-interceptor-use-cases#cache-requests
@Injectable()
export class CachingInterceptor<T> implements HttpInterceptor {
  constructor(private readonly cache: RequestCacheService<T>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const cachedResponse = this.cache.get(req);
    return cachedResponse
      ? of(cachedResponse)
      : sendRequest(req, next, this.cache);
  }
}

function sendRequest<T>(
  req: HttpRequest<any>,
  next: HttpHandler,
  cache: RequestCacheService<T>
): Observable<HttpEvent<any>> {
  return next.handle(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cache.put(req, event);
      }
    })
  );
}
