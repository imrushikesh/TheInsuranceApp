import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../api-service.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  user: any;
  role: any;
  claimList: any;
  constructor(
    private userService: UserService,
    private service: ApiServiceService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    if (this.user != undefined) {
      this.role = this.user.role;
      if (this.role == 'admin') {
        this.service.getAllClaims().subscribe({
          next: (response: any) => {
            this.claimList = response;
            console.log(this.claimList);
          },
          error: (Response) => {
            console.log(Response);
          },
        });
      }
    } else {
      this.toaster.error('Session Error! Login Again');
      this.router.navigate(['login']);
    }
  }

  accept(claim:any) {
    console.log(claim);
    claim.status="Accepted"
    this.service.updateClaims(claim).subscribe({
      next: (response: any) => {
        this.router.navigate(['admin']);
      },
      error: (Response) => {
        console.log(Response);
      },
    });
  }

  reject(claim:any) {
    console.log(claim);
    claim.status="Rejected"
    this.service.updateClaims(claim).subscribe({
      next: (response: any) => {
        this.router.navigate(['admin']);
      },
      error: (Response) => {
        console.log(Response);
      },
    });
  }
}
