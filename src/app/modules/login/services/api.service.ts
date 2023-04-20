import {Injectable} from '@angular/core';
import {Observable, of, switchMap, throwError, timer} from 'rxjs';
import {IApiErrorResponse} from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _isFirstSubmit = true;

  private _generateLoginResponse = (): Observable<any> => {
    if (this._isFirstSubmit) {
      this._isFirstSubmit = false;

      return throwError((): IApiErrorResponse => ({
        message: 'The user with the email and/or password was not found',
      }));
    } else {
      return of(true);
    }
  };

  login(login: string, password: string): Observable<boolean> {
    return timer(1000)
      .pipe(
        switchMap(() => this._generateLoginResponse()),
      );
  }
}
