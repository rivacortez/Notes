import { HttpInterceptorFn } from '@angular/common/http';


export const authenticationInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('token');
  const handledRequest = token
    ? request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) })
    : request;
  return next(handledRequest);
};
