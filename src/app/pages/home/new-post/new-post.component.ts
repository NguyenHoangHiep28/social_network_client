import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/_model/file-handle.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  uploadImages: FileHandle[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    if (event.target.files) {
      const file: File = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL( file)
        ),
      };

      this.uploadImages.push(fileHandle);
    }
  }
}
