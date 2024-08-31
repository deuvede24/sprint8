import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private errorMessageSource = new Subject<string>();
  errorMessage$ = this.errorMessageSource.asObservable();

  showError(message: string) {
    this.errorMessageSource.next(message);
  }
}
