import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClaimComponent } from './add-claim/add-claim.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ListClaimComponent } from './list-claim/list-claim.component';
import { LoginComponent } from './login/login.component';
import { UpdateClaimComponent } from './update-claim/update-claim.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminPanelComponent},
  {path:'claims',component:ListClaimComponent},
  {path:'add',component:AddClaimComponent},
  {path:'claims/add',component:AddClaimComponent},
  {path:'edit',component:UpdateClaimComponent},
  {path:"Claim/edit/:id",component:UpdateClaimComponent},
  {path:'***',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
