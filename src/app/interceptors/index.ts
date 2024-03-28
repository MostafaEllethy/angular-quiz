import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { CachingInterceptor } from './caching-interceptor';

export const cachingProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: CachingInterceptor,
  multi: true,
};
