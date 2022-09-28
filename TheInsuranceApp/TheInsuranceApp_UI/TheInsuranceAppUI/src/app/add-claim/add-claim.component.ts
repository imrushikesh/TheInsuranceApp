import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, VERSION } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-claim',
  templateUrl: './add-claim.component.html',
  styleUrls: ['./add-claim.component.css'],
})
export class AddClaimComponent implements OnInit {
  addEmployee = {
    UserName: '',
    Status: '',
    PolicyId: '',
    PolicyName: '',
  };
  BillImageData: any;
  url: any;
  image: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private service: ApiServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  submit() {
    let newClaim = {
      userName: 'userName From Login',
      status: 'New',
      billImageData: this.url.toString().split(',').pop(),
      policyId: this.addEmployee.PolicyId,
      policyName: this.addEmployee.PolicyName,
    };
    console.log(newClaim);
    this.service.addClaims(newClaim).subscribe({
      next: (response: any) => {
        this.toastr.success("New Claim Added" ,"Success",{
          timeOut: 1000,
        });
       
        this.router.navigate(['claims']);
      },
      error: (Response) => {
        this.toastr.error("Error ! Try Again");
        console.log(Response);
      },
    });
  }
}
