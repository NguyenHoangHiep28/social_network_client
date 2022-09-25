import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorText : string = '';
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private router : Router, private service : AuthenticationService) {
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
      let credential = {
        username : this.angForm.value.email,
        password : this.angForm.value.password
      }
      this.service.login(credential).subscribe(res => {
        console.log(res)
      }, err => {
        if(err.status == 400) {
          this.errorText = err.error.error
        }
      })
    }
  }
  goToRegister() {
    this.router.navigateByUrl('/authenticate/register');
  }
}
