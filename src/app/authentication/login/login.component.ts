import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  @ViewChild('confirmationModal')
  
  private modalComponent!: ConfirmationModalComponent;
  modalStyle: string = 'modal-style-primary';
  modalTitle: string = 'Login Failed';
  modalBody: string = '';
  modalButtonColor: string = 'btn-primary';

  async openModal() {
    return await this.modalComponent.open();
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AuthenticationService
  ) {
    this.angForm = this.fb.group({
      // fullName : ['', Validators.required,Validators.pattern("\p{L}")],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100),
          Validators.pattern(/\.[a-z]+$/),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  ngOnInit(): void {}
  
  login() {
    this.angForm.markAllAsTouched();
    if (this.angForm.valid) {
      let credential = {
        username: this.angForm.value.email,
        password: this.angForm.value.password,
      };
      this.service.login(credential).subscribe(
        (res) => {
          this.router.navigateByUrl('/dashboard');
        },
        (err) => {
          switch (err.status) {
            case 400:
              this.modalBody = err.error.error;
              this.openModal();
              break;
            case 401:
              this.modalBody =  'Unable to Login. Please check your email  for verification ';
              this.openModal();
              break;
          }
        }
      );
    }
  }
  goToRegister() {
    this.router.navigateByUrl('/authenticate/register');
  }
}
