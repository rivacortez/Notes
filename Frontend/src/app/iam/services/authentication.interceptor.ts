import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Authentication Interceptor
 * <p>
 *  This function is an interceptor that adds the token to the request headers.
 *  If the token exists in the local storage, it will be added to the request headers.
 *  Otherwise, the request will be returned as is.
 * </p>
 * @param request
 * @param next
 */
export const authenticationInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('token');



  const handledRequest = token
    ? request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) })
    : request;
  return next(handledRequest);
};
