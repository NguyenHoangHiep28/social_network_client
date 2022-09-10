import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private router : Router) {
    this.angForm = this.fb.group({
      fullName : ['', [Validators.required,Validators.minLength(6), Validators.maxLength(30),Validators.pattern(/^[\p{L} ]+$/u)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100), Validators.pattern(/\.[a-z]+$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword : ['', Validators.required]
    }, {
      validator : ComparePassword("password", "confirmPassword")
    });
   }
  ngOnInit(): void {
  }
  register() {
    console.log(this.angForm.controls['email'].errors)
    console.log(this.angForm.controls['password'].errors)
    this.angForm.markAllAsTouched();
    if (this.angForm.valid) {
      console.log(this.angForm.errors)
    }
  }
}
export function ComparePassword(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
