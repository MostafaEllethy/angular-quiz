import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestCacheService<T> {
  map = new Map<string, HttpResponse<T>>();

  put(req: HttpRequest<unknown>, res: HttpResponse<T>) {
    this.map.set(req.urlWithParams, res);
  }

  get(req: HttpRequest<unknown>): HttpResponse<T> | undefined {
    console.log(req.urlWithParams, this.map.get(req.urlWithParams));
    return this.map.get(req.urlWithParams);
  }
}
