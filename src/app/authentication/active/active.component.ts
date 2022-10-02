import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css'],
})
export class ActiveComponent implements OnInit {
  timeLeft: number = 5;
  interval: any;
  confirmToken: string = '';
  private url = 'http://localhost:8080/winku/api/v1/register/confirm';

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.router.navigateByUrl('/dashboard');
      }
    }, 1000);
  }

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.confirmAccount().subscribe(
      (res) => {
        this.startTimer();
      },
      (err) => {
        // the email already confirmed
        this.router.navigateByUrl('/dashboard');

        this.toastService.show('', 'Email is already confirmed');
      }
    );
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  getqueryParamMap() {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.confirmToken = params['token'];
      console.log(this.confirmToken);
    });
  }
  confirmAccount() {
    this.getqueryParamMap();

    return this.http.get(this.url + `?token=${this.confirmToken}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      observe: 'response',
      withCredentials: true,
    });
  }
}
