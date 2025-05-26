import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {FormBuilder,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import { registerField } from '../../shared/fieldConfig/register.form.config';
import { Router,RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { IUser } from '../../shared/models/user.model';
import { IRegisterRequest } from '../../shared/models/register.model';
import { error } from 'console';
import { IErrorResponse } from '../../shared/models/common.model';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
registerForm!: FormGroup;
submitted = false;
fields = registerField
router = inject(Router);
authServices = inject(AuthService)
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),]],
      confirmPassword: ['', Validators.required]
    }, { Validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value == form.get('confirmPassword')?.value
      ? null: { mismatch: true };
  }

  getErrorMessage(fieldName:string):string{
    console.log("wfwf",fieldName)
  const field = this.fields.find((f)=>f.name==fieldName);
  const control = this.registerForm.get(fieldName);
   if(field){
    if(control&&control.errors){
    const firstErrorType = Object.keys(control.errors)[0];
    const errorMessage = field.errors?.find(
      (err:any)=> err.type == firstErrorType
    )?.message
     return errorMessage||''
    }
   }
   return ''
  }

  onSubmit() {
     if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value;
      localStorage.setItem('email', email);
      localStorage.removeItem('remainingTime');

      const credentials: IRegisterRequest =this.registerForm.value;
      this.authServices.register(credentials).subscribe({
        next:(response) =>{
        this.router.navigate(['/otp'])
        },
        error:(error:IErrorResponse) =>{
          console.log(error)
         if(error.key == "exists"){
          this.registerForm.get('email')?.setErrors({ exists: true });
         }else if (error.error == "passMismatch"){
         this.registerForm.get('confirmPassword')?.setErrors({ passMismatch: true });
         }else{
         console.error('Registration failed:', error.message); 
         }
        }
      })
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  }

