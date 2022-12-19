import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { PostService } from 'src/app/services/post.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FileHandle } from 'src/app/_model/file-handle.model';
import { PostScope } from 'src/app/_model/post-scope.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataCate: any = '';
  showModal: any = '';
  percentDone: number | undefined;
  uploadSuccess: boolean | undefined;
  private url = "http://localhost:8080/api/";


  files: File[] = [];
  postForm: FormGroup;
  uploadImages: FileHandle[] = [];
  postScope: PostScope[] = [
    { type: 0, name: 'public' },
    { type: 1, name: 'firend' },
    { type: 2, name: 'private' },
  ];
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private postService: PostService,
    private toastService: ToastService
  ) {
    this.postForm = this.fb.group({
      scope: [this.postScope[0].type],
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.loadList();

  }
  loadList() {
    this.http.get('http://localhost:8080/api/v1/category').subscribe(
      (res: any) => {
        // console.log(res)
        this.dataCate = res.body
      })
  }

}
