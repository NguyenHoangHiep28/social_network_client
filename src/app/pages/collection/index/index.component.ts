import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  dataCate: any = [];
  // txtSearch: any = '';
  txtSearch = new FormControl('');
  size: any;
  constructor(
    private toastService: ToastService,
    private http: HttpClient,

  ) { }

  ngOnInit(): void {
    this.loadList();
  }
  loadList() {
    console.log(this.size)
    let params = {
      "name_like": "",
      "wallet_address": this.txtSearch.value,
      "email_like": "",
      "sort_by": ["created_at"],
      "order": ["DESC"],
      "page": 1,
      "size": 10
    }
    this.http.post('http://localhost:8080/api/v1/account/filter', params).subscribe(
      (res: any) => {
        console.log(res)
        this.dataCate = res.body.content
      })
  }
  onClick() {
    this.toastService.show('', 'abssss')
    console.log(1)
  }
  searchItem() {
    this.loadList();
  }
}
