import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplyloanComponent } from './applyloan/applyloan.component';

const routes: Routes = [
  { path: '', redirectTo: 'verify', pathMatch: 'full' },
  { path: 'verify', component: ApplyloanComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
