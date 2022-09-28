import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../api-service.service';
import { UserService } from '../user.service';

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
    private toast: ToastrService,
    private userService:UserService
  ) {}

  ngOnInit(): void {}

  submit() {
    console.log(this.loginUser);
    this.service.getUser(this.loginUser).subscribe({
      next: (response: any) => {
        console.log(response[0]);
        if (response[0].role == 'admin') {
          this.userService.currentUser(response[0]);
          this.router.navigate(['admin']);
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
