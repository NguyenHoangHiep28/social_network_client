import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private router : Router) {
    this.angForm = this.fb.group({
      // fullName : ['', Validators.required,Validators.pattern("\p{L}")],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100), Validators.pattern(/\.[a-z]+$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
   }

  ngOnInit(): void {

  }
  login() {
    console.log(this.angForm.controls['email'].errors)
    console.log(this.angForm.controls['password'].errors)
    this.angForm.markAllAsTouched();
    if (this.angForm.valid) {
      console.log(this.angForm.errors)
    }
  }
  goToRegister() {
    this.router.navigateByUrl('/authenticate/register');
  }
}
