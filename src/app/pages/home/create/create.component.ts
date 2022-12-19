import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { HomeModel } from '../models/HomeModel';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Input() id: any;
  value: any;
  myForm = new FormGroup({
    name: new FormControl(''),
    file: new FormControl(''),
    image: new FormControl<File | null>(null)
  });

  constructor(
    private http: HttpClient,
    private HomeModel: HomeModel,
    private toastService: ToastService,
    private route: ActivatedRoute

  ) {


  }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    if (id) {
      this.id = id;
    } else {
      this.id = '';
    }
    this.edit();
  }
  edit() {
    this.http.get('http://localhost:8080/api/v1/category/' + this.id).subscribe(
      (res: any) => {
        this.value = res.body
      })
  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.value.image = file
    }
  }

  submit() {
    if (this.id != '') {
      if (this.myForm.value.name == '') {
        this.toastService.show('', 'Category name cannot be blank!')
      }
      else if (this.myForm.value.image == null) {
        this.toastService.show('', 'Images cannot be blank!')
      }
      else {
        const formData = new FormData();
        formData.append('categoryId', this.id);
        formData.append('name', this.myForm.value.name || '');
        formData.append('image', this.myForm.value.image || '');
        this.http.post<any>('http://localhost:8080/api/v1/category', formData)
          .subscribe(data => {
            if (data.body.status == 201) {
              this.toastService.show('', 'Successfully update category!')
              window.location.href = '/dashboard'
            } else {
              this.toastService.show('', 'Added update category failure!')
            }
          });
      }
    } else {
      if (this.myForm.value.name == '') {
        this.toastService.show('', 'Category name cannot be blank!')
      }
      else if (this.myForm.value.image == null) {
        this.toastService.show('', 'Images cannot be blank!')
      }
      else {
        const formData = new FormData();
        formData.append('categoryId', this.myForm.value.name || '');
        formData.append('name', this.myForm.value.name || '');
        formData.append('image', this.myForm.value.image || '');
        this.http.post<any>('http://localhost:8080/api/v1/category', formData)
          .subscribe(data => {
            console.log(data)
            if (data.body.status == 200) {
              this.toastService.show('', 'Successfully added new category!')
              window.location.href = '/dashboard'
            } else {
              this.toastService.show('', 'Added new category failure!')
            }
          });
      }
    }
  }
}
