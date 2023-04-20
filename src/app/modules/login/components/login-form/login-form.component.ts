import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {AbstractControl, FormControl, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {catchError, filter, of} from 'rxjs';
import {IApiErrorResponse} from '../../interfaces/api-response.interface';
import {ApiService} from '../../services/api.service';
import {DOCUMENT} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'em-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  form: UntypedFormGroup;

  isPending = false;
  message: string | null = null;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private apiService: ApiService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.form = this.formBuilder.group({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  get email(): AbstractControl {
    return this.form.controls['email'];
  }

  get password(): AbstractControl {
    return this.form.controls['password'];
  }

  submitHandler() {
    this._touchFormControls();

    if (this.form.invalid || this.isPending) {
      return;
    }

    this._prepareSubmit();

    this.apiService.login(this.email.value, this.form.controls['password'].value)
      .pipe(
        catchError(error => {
          this._handleError(error);
          return of(false);
        }),
        filter(Boolean),
      )
      .subscribe(() => {
        this._handleSuccess();
      });
  }

  private _handleSuccess() {
    this._finishSubmit();
    this.router.navigate(['/profile']);
  }

  private _handleError(error: IApiErrorResponse) {
    if (error?.message) {
      this.message = error.message;
    } else {
      this.message = null;
    }

    this._finishSubmit();
  }

  private _prepareSubmit() {
    this.isPending = true;
    this.message = null;
  }

  private _finishSubmit() {
    this.isPending = false;
    this.cdr.markForCheck();
  }

  private _touchFormControls() {
    this.form.markAllAsTouched();

    for (let name in this.form.controls) {
      let control = this.form.controls[name];

      if (control.invalid) {
        let input = this.document.querySelector(`[name="${name}"]`) as HTMLInputElement;
        input.focus();
        break;
      }
    }
  }
}
