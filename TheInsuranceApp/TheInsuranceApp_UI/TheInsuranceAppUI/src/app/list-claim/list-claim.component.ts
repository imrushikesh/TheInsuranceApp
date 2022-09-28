import { Component, OnInit } from '@angular/core';
import { __makeTemplateObject } from 'tslib';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-list-claim',
  templateUrl: './list-claim.component.html',
  styleUrls: ['./list-claim.component.css'],
})
export class ListClaimComponent implements OnInit {
  constructor(private service: ApiServiceService) {}
  claimList: any;
  ngOnInit(): void {
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
}
