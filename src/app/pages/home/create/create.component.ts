import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { HomeModel } from '../models/HomeModel';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  myForm = new FormGroup({
    name: new FormControl(''),
    file: new FormControl(''),
    image: new FormControl<File | null>(null)
  });

  constructor(
    private http: HttpClient,
    private HomeModel: HomeModel,
    private toastService: ToastService

  ) { }

  ngOnInit(): void {
  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.value.image = file
    }
  }

  submit() {
    if(this.myForm.value.name == ''){
        this.toastService.show('', 'Category name cannot be blank!')
    }
    else if(this.myForm.value.image == null){
      this.toastService.show('', 'Images cannot be blank!')
    }
    else{
      const formData = new FormData();
      formData.append('name', this.myForm.value.name || '');
      formData.append('image', this.myForm.value.image || '');
      this.http.post<any>('http://localhost:8080/api/v1/category', formData)
        .subscribe(data => {
          console.log(data)
          if (data.body.status = 200){
            this.toastService.show('', 'Successfully added new category!')
            window.location.href = '/dashboard'
          }else{
            this.toastService.show('', 'Added new category failure!')
          }
        });
    }
  }
}
