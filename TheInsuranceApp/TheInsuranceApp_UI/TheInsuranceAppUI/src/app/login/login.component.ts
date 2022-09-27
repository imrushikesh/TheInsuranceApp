import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUser = {
    UserName: '',
    PassWord: '',
  };
  constructor(
    private service: ApiServiceService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  submit() {
    console.log(this.loginUser);
    this.service.getUser(this.loginUser).subscribe({
      next: (response: any) => {
        console.log(response[0]);
        if (response[0].role == 'admin') {
          this.router.navigate(['claims']);
          console.log('admin login');
        }
        if (response[0].role == 'user') {
          console.log('user login');
        }
      },
      error: (response: any) => {
        this.toast.error('Please Try Again', 'Error', {
          timeOut: 1000,
        });
      },
    });
  }
}
