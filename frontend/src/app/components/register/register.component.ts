/*import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, AbstractControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    const formOptions: AbstractControlOptions = {
      validators: this.checkPasswords
    };

    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, formOptions);

  }

  ngOnInit(): void { }

  checkPasswords(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      group.get('confirmPassword')?.setErrors(null);
      return null;
    }
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched || this.submitted) : false;
  }

  register(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      this.markAllFieldsAsTouched();
      return;
    }

    const { fullName, email, password } = this.registerForm.value;
    this.authService.register({ fullName, email, password }).subscribe({
      next: () => {
        this.authService.login({ email, password }).subscribe({
          next: () => {
            this.router.navigate(['/starships']);
          },
          error: () => {
            this.errorMessage = 'Registration successful, but login failed. Please try logging in manually.';
            this.router.navigate(['/login']);
          }
        });
      },
      error: (err) => {
        if (err.status === 400) {
          this.errorMessage = 'The user already exists. Please try with another email.';
        } else {
          this.errorMessage = 'An unknown error occurred. Please try again.';
        }
      }
    });
  }

  markAllFieldsAsTouched() {
    Object.values(this.registerForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, AbstractControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthResponse } from '../../interfaces/user';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    const formOptions: AbstractControlOptions = {
      validators: this.checkPasswords
    };

    /* this.registerForm = this.formBuilder.group({
       fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/)]],
       email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required, Validators.minLength(6)]],
       confirmPassword: ['', [Validators.required]]
     }, formOptions);
   }*/

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/)]],
      surname: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, formOptions);
  }


  ngOnInit(): void { }

  checkPasswords(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      group.get('confirmPassword')?.setErrors(null);
      return null;
    }
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched || this.submitted) : false;
  }

  /* register(): void {
     this.submitted = true;
     if (this.registerForm.invalid) {
       this.errorMessage = 'Please fill out the form correctly.';
       this.markAllFieldsAsTouched();
       return;
     }
 
     //const { fullName, email, password } = this.registerForm.value;
     const { name, surname, email, password } = this.registerForm.value;
     //const role = 'user';  // Aquí definimos el rol por defecto
    // this.authService.register({ fullName, email, password }).subscribe({
       this.authService.register({ name, surname, email, password,  id_user: 0, role: 'user' }).subscribe({
       next: () => {
         this.authService.login({ email, password }).subscribe({
           next: () => {
             this.router.navigate(['/recipes']);
            //sthis.router.navigate(['/']);
           },
           error: () => {
             this.errorMessage = 'Registration successful, but login failed. Please try logging in manually.';
             this.router.navigate(['/login']);
           }
         });
       },
       error: (err) => {
         if (err.status === 400) {
           this.errorMessage = 'The user already exists. Please try with another email.';
         } else {
           this.errorMessage = 'An unknown error occurred. Please try again.';
         }
       }
     });
   }*/

  //FUNCIONA CON ERRORES DE INTERFACE
  register(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      this.markAllFieldsAsTouched();
      return;
    }
    console.log(this.registerForm.value);

    const { name, surname, email, password } = this.registerForm.value;

    this.authService.register({ name, surname, email, password }).subscribe({
      next: (response: AuthResponse) => {  // Asegurándote de que AuthResponse esté correctamente definido
        if (response && response.user) {
          // const { email, password } = response.user;
          //this.authService.login({ email, password }).subscribe({

        //  const loginData = { email: response.user.email, password: password }; // Utiliza el password del formulario
          //  this.authService.login(loginData).subscribe({
          this.authService.login({ email, password }).subscribe({
            next: () => {
              this.router.navigate(['/recipes']);
            },
            error: () => {
              this.errorMessage = 'Registration successful, but login failed. Please try logging in manually.';
              this.router.navigate(['/login']);
            }
          });
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      },
      error: (err) => {
        if (err.status === 400) {
          this.errorMessage = 'The user already exists. Please try with another email.';
        } else {
          this.errorMessage = 'An unknown error occurred. Please try again.';
        }
      }
    });
  }



  markAllFieldsAsTouched() {
    Object.values(this.registerForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
