import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  //modal infomation
  @ViewChild('confirmationModal')
  private modalComponent!: ConfirmationModalComponent;
  
  modalStyle: string = 'modal-style-primary';
  modalTitle: string = 'Register Failed';
  modalBody: string = 'Email already exists, please register again';
  modalButtonColor: string = 'btn-primary';

  async openModal() {
    return await this.modalComponent.open();
  }

  getConfirmationValue(value: any) {
    if (value == 'Save click') {
      console.log(value);
    }
  }

  angForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AuthenticationService,
    private toastService: ToastService
  ) {
    this.angForm = this.fb.group(
      {
        fullName: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern(/^[\p{L} ]+$/u),
          ],
        ],
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
        gender: [
          '',
          [
            Validators.required,
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: ComparePassword('password', 'confirmPassword'),
      }
    );
  }
  ngOnInit(): void {}
  
  register() {
    // console.log(this.angForm.controls['email'].errors)
    // console.log(this.angForm.controls['password'].errors)

    this.angForm.markAllAsTouched();
    if (this.angForm.valid) {
      let credential = {
        fullName: this.angForm.value.fullName,
        email: this.angForm.value.email,
        password: this.angForm.value.password,
        gender: +this.angForm.value.gender,
      };
      console.log(credential);

      this.service.register(credential).subscribe(
        (res) => {
          //show toast message
          this.toastService.show(
            'Register Success !',
            'Please check email to verify the account'
          );

          console.log('register success')
        },
        (err) => {
          // open modal when emal is already exists
          if (err.status === 500) {
            this.openModal(); 
          }
        }
      );
    }
  }
}
export function ComparePassword(
  controlName: string,
  matchingControlName: string
) {
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
