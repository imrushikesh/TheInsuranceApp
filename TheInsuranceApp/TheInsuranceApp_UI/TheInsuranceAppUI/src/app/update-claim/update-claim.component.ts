import { AnimateTimings } from '@angular/animations';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit, SecurityContext, VERSION } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-update-claim',
  templateUrl: './update-claim.component.html',
  styleUrls: ['./update-claim.component.css'],
})
export class UpdateClaimComponent implements OnInit {
  editEmployee = {
    claimId: '',
    UserName: '',
    status: '',
    BillImageData: [],
    PolicyId:'',
    PolicyName:''
  };
  newImageData: [];
  image: any;
  url: any;
  newClaim:any;
  userName:any;
  status:any;
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private service: ApiServiceService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.service.getSingleClaim(id).subscribe({
            next: (response) => {
              this.editEmployee.claimId = response.claimId;
              this.editEmployee.UserName = response.userName;
              this.editEmployee.status=response.status;
              this.editEmployee.BillImageData = response.billImageData;
              this.image = this.sanitizer.bypassSecurityTrustResourceUrl(
                `data:image/png;base64, ${response.billImageData}`
              );
              this.editEmployee.PolicyId=response.policyId,
              this.editEmployee.PolicyName=response.policyName,
              this.userName=response.userName;
              this.status=response.status;
            },
            error: (Response) => {
              console.log(Response);
            },
          });
        }
      },
    });
  }

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
    if(this.url)
    {
    this.newClaim = {
      claimId:this.editEmployee.claimId,
      userName: this.editEmployee.UserName,
      status: 'updated',
      billImageData: this.url.toString().split(',').pop(),
      policyId:this.editEmployee.PolicyId,
      policyName:this.editEmployee.PolicyName
    };
    
  }
  if (this.url==undefined || this.url==null){
    this.newClaim = {
      claimId:this.editEmployee.claimId,
      userName: this.editEmployee.UserName,
      status: 'updated',
      billImageData: this.editEmployee.BillImageData,
      policyId:this.editEmployee.PolicyId,
      policyName:this.editEmployee.PolicyName
    };
  }
    console.log(this.newClaim);
    this.service.updateClaims(this.newClaim).subscribe({
      next: (response: any) => {
        this.router.navigate(['claims']);
      },
      error: (Response) => {
        console.log(Response);
      },
    });
  }
  
  delete(id: any) {
    Swal.fire({
      title: 'Are you sure want to delete?',
      text: 'Record will be deleted Permanently !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.Comfirmdelete(id);
        this.toastr.info("Claim Deleted !" ,"info",{
          timeOut: 1000,
        });

      }
    });
  }

  Comfirmdelete(id: any) {
    if (id) {
      this.service.deleteSingleClaim(id).subscribe({
        next: (response) => {
          this.router.navigate(['claims']);
        },
        error: (Response) => {
          console.log(Response);
        },
      });
    } 
  }
}
