import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  baseApiUri: string = environment.baseApiUri;
  constructor(private http: HttpClient) {}

  getAllClaims(): Observable<any[]> {
    return this.http.get<any[]>(this.baseApiUri + '/api/Claim');
  }

  addClaims(newClaim: any): Observable<any[]> {
    return this.http.post<any[]>(this.baseApiUri + '/api/Claim', newClaim);
  }

  updateClaims(newClaim: any): Observable<any[]> {
    return this.http.put<any[]>(this.baseApiUri + '/api/Claim', newClaim);
  }

  getSingleClaim(id: any): Observable<any> {
    return this.http.get<any>(this.baseApiUri + '/api/Claim/' + id);
  }

  deleteSingleClaim(id: any): Observable<any> {
    return this.http.delete<any>(this.baseApiUri + '/api/Claim/' + id);
  }


  getUser(user:any){
    const params = new HttpParams()
   .set('UserName', user.UserName)
   .set('PassWord', user.PassWord);
    return this.http.get<any>("https://localhost:7097/api/user/GetUserRole",{params});

  }
}
