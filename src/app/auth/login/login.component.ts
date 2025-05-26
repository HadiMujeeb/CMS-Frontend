import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { loginField } from '../../shared/fieldConfig/login.form.config';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { ILoginRequest } from '../../shared/models/login.model';
import { response } from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm: FormGroup;
submitted = false;
fields = loginField;
authService = inject(AuthService);
router = inject(Router);
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  getErrorMessage(fieldName: string): string {
    const field = this.fields.find((f) => f.name === fieldName);
    const control = this.loginForm.get(fieldName);

    if (field && control && control.errors) {
      const firstErrorType = Object.keys(control.errors)[0];
      const errorMessage = field.errors?.find((err: any) => err.type === firstErrorType)?.message;
      return errorMessage || '';
    }
    return '';
  }

  onSubmit() {
    this.submitted = true;
    if(this.loginForm.valid){
      const credentials:ILoginRequest = this.loginForm.value;
    this.authService.login(credentials).subscribe({
      next:(response) =>{
      localStorage.setItem("Token",response.token);
      this.router.navigate(['/dashboard'])
      },
      error:(error) =>{
      if(error.key == "notFound"){
          this.loginForm.get('email')?.setErrors({ notFound: true });
         }else if (error.key == "invalid"){
         this.loginForm.get('password')?.setErrors({ invalid: true });
         }else{
         console.error('Login failed:', error.message); 
         }
      }
    })  
    }
  }
}
