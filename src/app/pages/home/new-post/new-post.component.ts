import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { PostService } from 'src/app/services/post.service';
import { FileHandle } from 'src/app/_model/file-handle.model';
import { PostScope } from 'src/app/_model/post-scope.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  percentDone: number | undefined;
  uploadSuccess: boolean | undefined;

  files: File[] = [];
  postForm: FormGroup;
  uploadImages: FileHandle[] = [];
  postScope: PostScope[] = [
    { type: 0, name: 'public' },
    { type: 1, name: 'firend' },
    { type: 2, name: 'private' },
  ];  

  constructor(
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private postService: PostService
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

  ngOnInit(): void {}

  onFileSelected(event: any) {
    if (event.target.files) {
      this.files = event.target.files;

      Array.from(this.files).forEach((file: File) => {
        const fileHandle: FileHandle = {
          file: file,
          url: this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(file)
          ),
        };
        this.uploadImages.push(fileHandle);
      });
    }
  }

  removeImages(index: number) {
    this.uploadImages.splice(index, 1);
  }

  resetForm () {
    this.postForm.reset();
  }


  onFormSubmit() {
    this.postForm.markAllAsTouched();

    if (this.postForm.valid) {
      const formData = new FormData();
      formData.append('content', this.postForm.value.content);
      Array.from(this.files).forEach((file: File) =>
      formData.append('files', file)
    );
      formData.append('scope', this.postForm.value.scope);

      // console.log(formData)
      
      this.postService.uploadPost(formData).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            this.percentDone = Math.round((100 * event.loaded) / event.total);
          }
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
      });
      this.resetForm();
    }
  }
}
